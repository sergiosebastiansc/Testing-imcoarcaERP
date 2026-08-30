@login
Feature: Login de Usuario
Como usuario
Quiero iniciar sesión en la plataforma
Para ingresar a las funciona sistema

Background:
Given El usuario esta previamente registrado
And Se encuentra en la pagina '/login'

Scenario: Inicio de sesión con validos
When el usuario ingresa los siguientes datos:

|   email           | password     |
| maria-m@gmail.com | mercedez1234 |

And el usuario hace click en el boton 'login-submit'
Then el usuario es redirigido a la pagina de inicio '/' 
And el botón 'nav-logOut' es visible

Scenario: Inicio de sesión con datos invalidos
When el usuario ingresa los siguientes datos:
|   email           | password       |
| maria-m@gmail.com | incorrecto1234 |

And el usuario hace click en el boton 'login-submit'
Then se debe mostrar el mensaje "Credenciales inválidas"
And el elemento 'alert-errorLogin' es visible

Scenario: Inicio de sesión con datos vacios
When el usuario ingresa los siguientes datos:

|   email           | password     |
|                   |              |

And el usuario hace click en el boton 'login-submit'
Then se debe mostrar el mensaje "Debe ingresar los campos obligatorios"
And el elemento 'alert-empyLogin' es visible
