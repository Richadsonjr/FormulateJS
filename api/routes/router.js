<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const mysql = require('mysql2')
const mysqlP = require('mysql2/promise'); // Importando a versão de promessas do MySQL
const jwt = require('jsonwebtoken')
const cors = require('cors')
const util = require('util');
const { result } = require('lodash');
const { Console } = require('console');
const axios = require('axios')
const qs = require('qs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')
const { exec } = require('child_process');
const { MailSender, Report, DateFormatter, DocumentFormatter, CurrencyFormatter, ActionButtons, LoadReport, TableActions, FormGenerator, FormGeneratorMSSQL, FormGeneratorSQLite } = require('../../core/formulatejs');








//=============================================

router.use(cors())

=======
const express = require('express');
const router = express.Router();
const mysql = require('mysql2')
const mysqlP = require('mysql2/promise'); // Importando a versão de promessas do MySQL
const jwt = require('jsonwebtoken')
const cors = require('cors')
const util = require('util');
const { result } = require('lodash');
const { Console } = require('console');
const axios = require('axios')
const qs = require('qs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')
const { exec } = require('child_process');
const { MailSender, Report, DateFormatter, DocumentFormatter, CurrencyFormatter, ActionButtons, LoadReport, TableActions, FormGenerator, FormGeneratorMSSQL, FormGeneratorSQLite } = require('../../core/formulatejs');








//=============================================

router.use(cors())

>>>>>>> 7a7339d8af9a2228acf0d620d15f2daca4e838d5
module.exports = router;