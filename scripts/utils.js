import fs from 'fs'
import del from 'del'
import Handlebars from 'handlebars'

export const mkdir = dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  return dir
}

export const rmdir = async dir => {
  return await del([dir])
}

export const handlebars = (source, data) => {
  const template = Handlebars.compile(source)
  return template(data)
}

export const read = (file, json) => {
  const data = fs.readFileSync(file, 'utf-8')
  return json ? JSON.parse(data) : data
}

export const write = (file, data, json) => {
  data = json ? JSON.stringify(data, null, 2) : data
  return fs.writeFileSync(file, data, 'utf-8')
}

// parseName('@babel/node') => { name: '@babel/node', ns1: 'babel', ns2: 'node' }
export const parseName = (name) => {
  const p = { name, ns1: name, ns2: name }
  const s = name.split('/')

  if(s.length == 2){
    p.ns1 = s[0].replace('@', '')
    p.ns2 = s[1]
  }

  return p
}