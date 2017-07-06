componentWillUpdate:function (nextProps, nextState) {//es llamado justo antes de que se vaya a actualizar el componente y recibe nextProps y nextState como argumentos

  },
  componentWillMount: function () {//es llamado justo antes de que el componente se cargue
    console.log('componentWillMount');
  },
  componentDidMount: function () { // es llamado justo después de que el compoennte es mostrado
    console.log('componentDidMount');
  },
  componentWillUnmount: function () { //life cycle component este se activa justo antes de que el componente sea removido del DOM
    console.log('componentDidUnmount');
    clearInterval(this.timer)//rompe el intervalo creado en startTimer
    this.timer = undefined;
  },

// ==============Metodos==========

// Esto corre en mongo
  Meteor.methods({
    greetUser(name = 'User'){
      console.log('Running from the console, man!!!');

      return `Hello ${name}`;
    },

    addNumbers(a, b){
      console.log('corriendo la suma');

      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Meteor.Error('invalid request', 'both arguments must be numbers')
      }else {
        return a + b;
      }
    }
  });
//  y esto lo pones en el cliente

Meteor.startup(() => {
  Meteor.call('greetUser', 'Oscar', (err, res)=>{//.call() llama a los metodos con dos argumentos el nombre del metodo y un callback
    console.log('Hola argumentos', err, res);
  });
  Meteor.call('addNumbers', 1, 4, (err, res)=> {
    console.log('la suma es', err, res);
  });
  ReactDOM.render(routes, document.getElementById('app'));
});
// =========================


//=============Request y Respond Meteor/node========
Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('this is from my custom middleware');
    console.log(req.url);//la url que utilizó cuando alguien cargo la pagina que sea que cargo
    console.log(req.method);//get, post, put, delete, etc
    console.log(req.headers);//headers
    console.log(req.query);//

    //Set http satus code
    res.statusCode = 404;
    //Set Http headers
    res.setHeader('my-header', 'yo estuve aqui');
    //Set http body
    res.write('<h1>Un titulo cualquiera</h1>');
    //end http request
    res.end();//termina la respuesta inmediatamente
    next();
  });
//====Redirecciona a google page

WebApp.connectHandlers.use((req, res) => {
  res.statusCode = 302;
  res.setHeader('Location', 'https://www.google.com');
  res.end();
});

// ============================

// const routes = (
//   <Router>
//     <Switch>
//       <Route exact path="/" component={Login}/>
//       <Route path="/signup" component={Signup}/>
//       <Route path="/link" component={Link}/>
//       <Route path="*" component={NotFound}/>{/*//macha todas las url que no sean las ya señaladas */}
//     </Switch>
//   </Router>
// );

//Nested Routes Example
/*
const NestedRoutes = () => (
    <div>
        <h2>This is my next nest</h2>
        <Switch>
            <Route exact path='/nextnest' component={Nest}/>
            <Route path='/nextnest/about' component={NestAbout}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
)

const SecondLevelNesting = () => (
  <Router>
      <MainLayout>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/nextnest" component={NestedRoutes}
              <Route component={NoMatch}/>
          </Switch>
      </MainLayout>
    </div>
  </Router>
);
*/
//
// Double-negation turns a "truthy" or "falsy" value into a boolean value, true or false.
//
// Most are familiar with using truthiness as a test:
//
// if (options.guess) {
//     // runs if options.guess is truthy,
// }
// But that does not necessarily mean:
//
// options.guess===true   // could be, could be not
// If you need to force a "truthy" value to a true boolean value, !! is a convenient way to do that:
//
// !!options.guess===true   // always true if options.guess is truthy
//
//
// 83
// down vote
// accepted
// It casts to boolean. The first ! negates it once, converting values like so:
//
// undefined to true
// null to true
// +0 to true
// -0 to true
// '' to true
// NaN to true
// false to true
// All other expressions to false
// Then the other ! negates it again. A concise cast to boolean, exactly
//  equivalent to ToBoolean simply because ! is defined as its negation.
//   It’s unnecessary here, though, because it’s only used as the condition
//   of the conditional operator, which will determine truthiness in the same way.


// ==============================Stateless========================================

//Stateless functional components = no puedes utilizar state
const MyComponent = () => {//esta funcion funciona como render por lo que ya no tienes que escribirlo otra vez
  return (
    <div>
      <h1>Hola</h1>
    </div>
  );
};

// ============Session
//se utiliza porque es reactivo lo que  va a ayudar que funcione con autoruncada vez que cambie el nombre
// Session.set('name', 'Oscar');
// const name = Session.get('name');
// console.log('mi nombre es:', name);

// ===============MOMENT========
// let momentNow = moment();
// console.log(momentNow.format('MMM Do YYYY, H:mma'));
