import meow from 'meow'
import execa from 'execa'
import { mkdir, rmdir, read, write, handlebars } from './utils'


(async () => {


  const cli = meow(`
    Usage
      $ init <project-name>

    Options
      --clean,  Clean files
      --playground,  Include playground

    Examples
      $ npx babel-node scripts/init.js my-project --playground
  `, {
    flags: {
      playground: {
        type: 'boolean'
      },
      clean: {
        type: 'boolean'
      }
    }
  })

  const log = console.log
  const input = cli.input
  const flags = cli.flags

  const dest = '.' || mkdir('./test')
  const clean = cli.flags.clean
  const project = input[0] || __dirname.split('/').reverse()[1]

  // console.log('input', input)
  // console.log('flags', flags)
  // console.log('project', project)

  // ----------------------------------------------------------------------------------

  log(`> init project "${project}"`)

  // create README.md file
  write(`${dest}/README.md`, handlebars(read(`./assets/README.md`), { project }))
  log(`+ README.md`)

  // create index.html file
  write(`${dest}/index.html`, handlebars(read(`./assets/index.html`), { project }))
  log(`+ index.html`)

  // create package.json  
  const pkg = read(`./package.json`, 'json')
  const devPkgs = ['handlebars', 'meow', 'yargs', 'execa', 'del']
  pkg.name = project
  pkg.description = project
  pkg.version = '0.0.1'
  pkg.scripts.release = 'np'
  delete pkg.author
  delete pkg.scripts.init
  devPkgs.map(m => (delete pkg.devDependencies[m]))
  write(`${dest}/package.json`, pkg, 'json')
  log(`+ package.json`)

  if(clean){
    await rmdir(`./scripts`)
    log(`- scripts`)
    
    await rmdir(`./assets`)
    log(`- assets`)

    await rmdir(`./.git`)
    log(`- .git`)
    
    await execa('yarn install', { shell: true })
  }


})()

