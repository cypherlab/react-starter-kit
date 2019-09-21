import meow from 'meow'
import execa from 'execa'
import { mkdir, rmdir, read, write, handlebars, parseName } from './utils'


(async () => {


  const cli = meow(`
    Usage
      $ kit <project-name>

    Options
      --ack,          dry run by default, specify this option to run real
      --clean,        delete kit files
      --playground,   include playground

    Examples
      $ npx babel-node scripts/kit.js
  `, {
    flags: {
        ack: { type: 'boolean' }
      , playground: { type: 'boolean' }
      , clean: { type: 'boolean' }
    }
  })

  const log = console.log
  const input = cli.input
  const flags = cli.flags

  const dry = !flags.ack ? true : false
  const dest = dry ? mkdir('./__dry') : '.'
  const clean = dry ? false : cli.flags.clean
  const project = parseName(input[0] || __dirname.split('/').reverse()[1])

  // console.log('input', input)
  // console.log('flags', flags)
  // console.log('project', project)
  // console.log('dry', dry)
  // return 

  // ----------------------------------------------------------------------------------

  dry && log(`> ~~~~~~~~~ dry run, renders in "${dest}" folder.`)
  log(`> init project "${project.name}"`)

  // create README.md file
  write(`${dest}/README.md`, handlebars(read(`./assets/README.md`), { project }))
  log(`+ README.md`)

  // create index.html file
  write(`${dest}/index.html`, handlebars(read(`./assets/index.html`), { project }))
  log(`+ index.html`)

  // create package.json  
  const pkg = read(`./assets/package.json`, 'json')
  pkg.name = project.name
  pkg.description = project.name
  pkg.repository = `https://github.com/${project.ns1}/${project.ns2}`
  write(`${dest}/package.json`, pkg, 'json')
  log(`+ package.json`)

  if(clean){
    
    await rmdir(`./__dry`)
    log(`- __dry/`)

    await rmdir(`./scripts`)
    log(`- scripts/`)
    
    await rmdir(`./assets`)
    log(`- assets/`)

    await rmdir(`./.git`)
    log(`- .git/`)
    
    await execa('git init', { shell: true })
    log(`> git init`)

    await execa('yarn install', { shell: true })
    log(`> yarn install`)
  }


})()

