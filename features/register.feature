@register
Plataforma destinada a la gestión y agendamiento de reservas para espacios de Coworking
Feature: Registro de Usuario
Como usuario visitante
Quiero registrarme en la plataforma
Para crear una cuenta e ingresar al sistema

Background:
Given el usuario esta en la página '/registro' de la plataforma

Scenario: Registro exitoso con datos validos

When el usuario ingresa los siguientes datos:

| nombre Completo       |   email           | password     |  password     |
| María de las Mercedez | maria-m@gmail.com | mercedez1234 | mercedez1234  |

And el usuario hace click en el boton 'register-submit'
Then se debe mostrar el mensaje de confimacion "Registro exitoso"
And el usuario es redirigido a la página '/'
And el botón 'nav-logOut' es visible

Scenario: registro con contraseñas que no coinciden
When el usuario ingresa los siguientes datos:

| nombre Completo       |   email           | password     |  password     |
| María de las Mercedez | maria-m@gmail.com | mercedez1234 | ncorrecto1234 |

And el usuario hace click en el boton 'register-submit'
Then se debe mostrar el mensaje de error "Contraseñas no coinciden"
And el elemento 'alert-password' es visible

Scenario: Registro con campos obligatorios vacios

When el usuario ingresa los siguientes datos:

| nombre completo      | email             | password     | password     |
|                      | maria-m@gmail.com | mercedez1234 | mercedez1234 |
| María de las Mercedez|                   | mercedez1234 | mercedez1234 |
| María de las Mercedez| maria-m@gmail.com |              | mercedez1234 |
| María de las Mercedez| maria-m@gmail.com | mercedez1234 |              |

And el usuario hace click en el boton 'register-submit'
Then se debe mostrar el mensaje de error "Debe completar los campos faltantes"
And el elemento 'alert-empty' es visible



