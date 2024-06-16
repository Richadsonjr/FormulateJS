var config =require('../api/utils/define.json')

const dataBd ={
    host: config.configs.databasePrime.host,
    user: config.configs.databasePrime.user,
    password: config.configs.databasePrime.pass,
    database: config.configs.databasePrime.db
}

try {
        await MakeaFormsDB(config.configs.path.configFormView, dataBd)
        await MakeaTableDB(config.configs.path.configTableview, dataBd)
        console.log('Arquivos de configuração criados com sucesso.')
    } catch (error) {
        console.log(error)
        console.log('Falha ao criar arquivos de configuração.')
    }