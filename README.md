# Desarrollo de aplicación multiplataforma 

Este repositorio contiene el trabajo práctico final de la asignatura de Desarrollo de Aplicaciones Multiplataforma de la Carrera de Especialización en IoT de la Universidad de Buenos Aires.
### Tema: Sistema de riego automatizado 

Se necesitará de recopilar la información proporcionada por un sensor que va a medir la
humedad de la tierra mediante el uso de un tensiómetro el cual responde a cambios de
tensión de humedad en el suelo y su funcionamiento se rige por la fuerza de succión del
suelo. Consiste en un medidor de vacío y un tubo sellado con una capa de cerámica porosa.
La capa de cerámica simula movimiento del agua a través del suelo. Mientras más seco se
encuentra el suelo, más alta será la lectura del tensiómetro. La interpretación de la lectura
de un tensiómetro varía según el cultivo, el tipo de suelo y curva de humedad
correlacionada. Sin embargo, se puede tomar de referencia que de 0 a 10 centibares (Cb) el
suelo está saturado; de 10 a 30 Cb, el suelo está en CC; y, de 30 a 60 Cb, el suelo está
seco y debe regarse de inmediato.


### Para ello, se creó una aplicación en Ionic que permite:
- Dar un listado de dispositivos.
- Al entrar a algún dispositivo, brindar el último valor de medición por sensor en el gráfico.
- Tener la opción dentro de la vista del dispositivo con sus medición, de poder abrir la electroválvula que le corresponde. (En el caso de que se abra o se cierre dicha electroválvula, se deberá insertar un registro en la tabla de Log_Riegos y por otro lado se necesitará realizar un insert sobre la tabla de mediciones para crear un nuevo registro con el nuevo valor solamente si se cierra la electroválvula)
- Tener otra opción que permita ver todas las mediciones de ese sensor como una tabla.
- Poder consultar el log de los riegos para una electroválvula.

#### Restricciones App:
La aplicación cuenta con:
- ~ 5 Directivas estructurales (ngIf, ngFor).
- 1 directiva de atributo (custom) → para cambiar el color del fondo del listado de sensores.
- 2 pipe custom → para cambiar el formato de la fecha y el estado de apertura de la electroválvula.
- 1 servicio para conectar a la API.
- 1 Api en Express con comunicación a la base de datos.

#### La base de datos cuenta con las siguientes tablas:
- Tabla Mediciones: Tabla en donde se registra fecha y hora de la medición junto con el id perteneciente al dispositivo que registró esa medición
- Tabla Dispositivos: Representa a un sensor de humedad . Esta tabla va a tener el identificador único junto con un nombre y un lugar en donde esté ubicado
- Tabla Electroválvula: Representa a la válvula que permite el paso o no del flujo de agua. Esta tabla contiene el identificador propio junto con el identificador del dispositivo al cual está conectado.
- Tabla Log_Riegos: Representa al histórico de aperturas/cieres de electroválvula, por cada vez que se abra o se cierre una electroválvula, se insertará un registro en esta tabla.

### Demostración de app en funcionamiento:

https://github.com/tmonreal/DAM/assets/84754265/5a9093fa-b5bd-4074-9914-ef8810c3180f

