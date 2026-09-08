@booking

Feature: Reserva de espacios de coworking
  Como usuario autenticado
  Quiero poder reservar un espacio de trabajo
  Para asegurar disponibilidad en la fecha y horario que necesito

  Background:
    Given el usuario está autenticado en la plataforma
    And se encuentra en la página de reservas '/reserva'

  Scenario: Reserva exitosa con todos los campos obligatorios
    When el usuario ingresa los siguientes datos:
      | espacio              | fecha      | horario       | personas |
      | Suite de Reuniones A | 15/10/2026 | 09:00 - 11:00 | 7        |

    And hace click en el botón 'booking-submit'
    Then debe visualizar el mensaje "Reserva confirmada exitosamente"
    And el elemento 'success-booking' es visible

  Scenario: Reserva sin seleccionar espacio
    When el usuario ingresa los siguientes datos:
      | espacio              | fecha      | horario       | personas |
      |                      | 15/10/2026 | 09:00 - 11:00 | 7        |
    And hace click en el botón 'booking-submit'
    Then debe visualizar el mensaje de error "Debe seleccionar un espacio de trabajo"
    And el elemento 'emptyRoom-Booking' es visible

  Scenario: Reserva sin seleccionar fecha
    When el usuario ingresa los siguientes datos:
      | espacio              | fecha      | horario       | personas |
      | Suite de Reuniones A |            | 09:00 - 11:00 | 7        |

    And hace click en el botón 'booking-submit'
    Then debe visualizar el mensaje de error "Debe seleccionar una fecha"
    And el elemento 'emptyDate-Booking' es visible

  Scenario: Reserva sin seleccionar horario
    When el usuario ingresa los siguientes datos:
      | espacio              | fecha      | horario       | personas |
      | Suite de Reuniones A | 15/10/2026 |               | 7        |
    And hace click en el botón 'booking-submit'
    Then debe visualizar el mensaje de error "Debe seleccionar un horario"
    And el elemento 'emptyTime-Booking' es visible

  Scenario: Reservar en una fecha pasada
    When el usuario ingresa los siguientes datos:
      | espacio              | fecha      | horario       | personas |
      | Suite de Reuniones A | 15/10/2020 |               | 7        |
    And hace click en el botón 'booking-submit'
    Then debe visualizar el mensaje de error "No es posible reservar en una fecha pasada"
    And el elemento 'error-Date' es visible

  Scenario: Reservar un espacio no disponible
    Given el espacio "Suite de Reuniones A" está marcado como ocupado
    When intenta seleccionar el espacio "Suite de Reuniones A"
    Then el botón 'booking-submit' debe estar deshabilitado
    And debe visualizar la etiqueta "OCUPADO" en el espacio

  Scenario: Intentar reservar con número de personas superior a la capacidad
    When el usuario ingresa los siguientes datos:
      | espacio              | fecha      | horario       | personas |
      | Suite de Reuniones A | 15/10/2026 | 09:00 - 11:00 | 20        |
    And hace click en el botón 'booking-submit'
    Then debe visualizar el mensaje de error "El número de personas supera la capacidad del espacio"
    And el elemento 'error-capacity' es visible

