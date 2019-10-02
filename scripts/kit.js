export default async ({ utils, okk }) => {

  // pull some utils fonctions
  const { log, shell, mkdir, parseLibName, copyFlow } = utils

  const dry = okk.dry
  const clean = dry ? false : okk.flags.clean
  const dest = dry ? mkdir('./__dry') : '.'
  const project = parseLibName(okk.input[1] || __dirname.split('/').reverse()[1])
  const bake = copyFlow(okk.cfg('dirs.assets'), dest)

  dry && log(`> ~~~~~~~~~ dry run, renders in "${dest}" folder.`)
  log(`> initing project "${project.name}"`)

  log(`+ README.md`)
  bake('README.md', { project })

  log(`+ index.html`)
  bake(`index.html`, { project })

  log(`+ package.json`)
  bake('package.json', pkg => {
    pkg.name = project.name
    pkg.description = project.name
    pkg.repository = `https://github.com/${project.ns1}/${project.ns2}`
    return pkg
  })

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

  return 0
}