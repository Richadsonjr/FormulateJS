<<<<<<< HEAD
var config = require('../api/utils/define.json')
const FormGenerator = require('../core/formulatejs.js').FormGenerator

const dataBd = {
    host: config.configs.databasePrime.host,
    user: config.configs.databasePrime.user,
    password: config.configs.databasePrime.pass,
    database: config.configs.databasePrime.db
}

const formGenerator = new FormGenerator(config.configs.path.configFormView, dataBd)

try {
    await formGenerator.MakeaFormsDB()
    await formGenerator.MakeaTableDB()
    console.log('Arquivos de configuração criados com sucesso.')
} catch (error) {
    console.log(error)
    console.log('Falha ao criar arquivos de configuração.')
=======
var config = require('../api/utils/define.json')
const FormGenerator = require('../core/formulatejs.js').FormGenerator

const dataBd = {
    host: config.configs.databasePrime.host,
    user: config.configs.databasePrime.user,
    password: config.configs.databasePrime.pass,
    database: config.configs.databasePrime.db
}

const formGenerator = new FormGenerator(config.configs.path.configFormView, dataBd)

try {
    await formGenerator.MakeaFormsDB()
    await formGenerator.MakeaTableDB()
    console.log('Arquivos de configuração criados com sucesso.')
} catch (error) {
    console.log(error)
    console.log('Falha ao criar arquivos de configuração.')
>>>>>>> 7a7339d8af9a2228acf0d620d15f2daca4e838d5
}