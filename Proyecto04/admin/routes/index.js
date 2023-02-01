var express = require('express');
const axios = require('axios')
var router = express.Router();

const multer = require('multer');
const FormData = require('form-data');
const upload = multer();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/employees', async function (req, res, next) {

  const URL = 'http://localhost:5555/employees/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 5555
    }
  }
  const response = await axios.get(URL, config)

  res.render('show_data', { title: 'Empleados', aDatos: response.data, data: 'empleados' });
});

router.get('/sales', async function (req, res, next) {
  const URL = 'http://localhost:4444/sales/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  var response = await axios.get(URL, config)
  res.render('show_data', { title: 'Ventas', aDatos: response.data, data: 'ventas' });
});

router.get('/customers', async function (req, res, next) {
  const URL = 'http://localhost:5555/customers/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 5555
    }
  }
  const response = await axios.get(URL, config)

  res.render('show_data', { title: 'Clientes', aDatos: response.data, data: 'clientes' });
});

router.get('/offices', async function (req, res, next) {
  const URL = 'http://localhost:5555/offices/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 5555
    }
  }
  const response = await axios.get(URL, config)
  res.render('show_data', { title: 'Oficinas', aDatos: response.data, data: 'oficinas' });
});

router.get('/reports', async function (req, res, next) {
  const URL = 'http://localhost:5555/customers/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 5555
    }
  }
  const clientes = await axios.get(URL, config)

  res.render('reportes', { title: 'Reportes' , clientes: clientes.data});
  
  
});

router.get('/reports/:cn', async function (req, res, next) {
  const URL = 'http://localhost:4444/sales/shippedByCn/' + req.params.cn
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  var response = await axios.get(URL, config)
  res.render('reportes', { title: 'Reportes' , clientes: response});
  
});

router.get("/total/:orderId", async function (req, res, next) {
  orderId = req.params.orderId;
  const URL = 'http://localhost:4000/calculateTotal'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4000
    }
  }
  const URL2 = 'http://localhost:4444/sales/findById/' + orderId + '/json'
  const config2 = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL2, config2);
  let { quantityOrdered, priceEach } = response.data;
  arreglo = [quantityOrdered, priceEach]; 
  const response2 = await axios.post(URL, arreglo, config);
  res.render('total', { title: 'Total', total: response2.data });


});

router.get('/photos', async function (req, res, next) {

  const URL = 'http://localhost:4444/fotos/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config)

  response.data.map(item => { item.url = 'http://localhost:4444/' + item.ruta.replace('public/', '') })


  res.render('fotos', { title: 'Fotos', fotos: response.data });
})

router.get('/photos/add', function (req, res, next) {
  res.render('fotos_formulario', { title: 'Express', mode: 'add' });
});

router.get('/photos/edit/:id', async function (req, res, next) {
  const URL = 'http://localhost:4444/rest/fotos/findById/' + req.params.id + "/json";
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config);
  res.render('fotos_formulario', { title: 'Express', mode: 'edit', foto: response.data[0] });
});

router.get('/photos/delete/:id', upload.single('route'), async function (req, res, next) {
  const URL = 'http://localhost:4444/rest/fotos/delete/' + req.params.id;
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = axios.delete(URL, config);

  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect(303, '/photos');
  } else {
    res.redirect('/');
  }
});

router.post('/photos/update/:id', upload.single('route'), async function (req, res, next) {

  let { title, description, rate } = req.body;
  let { buffer, originalname } = req.file;
  const URL = 'http://localhost:4444/rest/fotos/update';
  let data = new FormData()
  data.append("id", req.params.id)
  data.append("titulo", title)
  data.append("descripcion", description)
  data.append("calificacion", rate)
  data.append("ruta", originalname)
  data.append("archivo", buffer, originalname)

  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  console.log(data)
  const response = await axios.put(URL, data, config);


  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect(303, '/photos')
  } else {
    res.redirect('/')
  }


});
router.post('/photos/save', upload.single('route'), async function (req, res, next) {

  let { title, description, rate } = req.body;
  let { buffer, originalname } = req.file;
  const URL = 'http://localhost:4444/rest/fotos/save';
  let data = new FormData()
  data.append("titulo", title)
  data.append("descripcion", description)
  data.append("calificacion", rate)
  data.append("ruta", originalname)
  data.append("archivo", buffer, originalname)

  const config = {
    headers: data.getHeaders(),
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.post(URL, data, config);


  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }


});

module.exports = router;
