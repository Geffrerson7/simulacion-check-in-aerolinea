# 🧑‍💻 Desafío Bsale - Simulación check-in de aerolínea

## Tabla de contenidos

1. [Descripción](#descripción)
2. [Desafío](#desafío)
3. [Estrategia de ramificación de Git](#estrategia-de-ramificación-de-git)
4. [Instalación local](#instalación-local)
5. [Tecnologías y lenguajes utilizados](#Tecnologías-y-lenguajes-utilizados)
6. [Documentación](#documentación)
7. [Referencias](#referencias)
8. [Demo](#demo)
9. [Autor](#Autor)

## Descripción

Es una API REST con un solo endpoint que permita consultar por el ID del vuelo y retornar la simulación de un check-in automático de los pasajeros de la aerolínea Andes Airlines.

## Desafío

Se debe crear una API REST con un solo endpoint que permita consultar por el ID del vuelo y retornar la simulación del check-in de pasajeros. El lenguaje y/o framework es de libre elección.

Para ello se contará con una base de datos (solo lectura) que contiene todos los datos necesarios para la simulación. El servidor está configurado para que todas aquellas conexiones inactivas por más de 5 segundos sean abortadas, por lo que se requiere controlar la reconexión.

![erd](https://user-images.githubusercontent.com/61089189/228735639-08f7e264-8b2b-4c24-962d-c719dc37626f.png)

Tal como muestra el ERD:

* Una compra puede tener muchas tarjetas de embarque asociadas, pero estas tarjetas pueden no tener un asiento asociado, siempre tendrá un tipo de asiento, por lo tanto, al retornar la simulación del check-in se debe asignar el asiento a cada tarjeta de embarque.

Los puntos a tomar en cuenta son:

* Todo pasajero menor de edad debe quedar al lado de al menos uno de sus acompañantes mayores de edad (se puede agrupar por el id de la compra).

* Si una compra tiene, por ejemplo, 4 tarjetas de embarque, tratar en lo posible que los asientos que se asignen estén juntos, o queden muy cercanos (ya sea en la fila o en la columna).

* Si una tarjeta de embarque pertenece a la clase “económica”, no se puede asignar un asiento de otra clase

* Los campos en la bd están llamados en Snake case, pero en la respuesta de la API deben ser transformados a Camel case.

* El servicio debe tener la siguiente estructura:

```
  GET /flights/:id/passengers
```

Respuesta exitosa:

```
{
    "code": 200,
    "data": {
        "flightId": 1,
        "takeoffDateTime": 1688207580,
        "takeoffAirport": "Aeropuerto Internacional Arturo Merino Benitez, Chile",
        "landingDateTime": 1688221980,
        "landingAirport": "Aeropuerto Internacional Jorge Cháve, Perú",
        "airplaneId": 1,
        "passengers": [
            {
                "passengerId": 98,
                "dni": 172426876,
                "name": "Abril",
                "age": 28,
                "country": "Chile",
                "boardingPassId": 496,
                "purchaseId": 3,
                "seatTypeId": 3,
                "seatId": 15
            },
            {...}
        ]
    }
}
```

Vuelo no encontrado:

```
{
"code": 404,
"data": {}
}
```

En caso de error:

```
{
"code": 400,
"errors": "could not connect to db"
}

```

## Estrategia de ramificación de Git

En este proyecto se trabaja con tres ramas:
La rama develop para agregar las funcionalides, algoritmos y configuraciones principales en la etapa de desarrollo, production para agregar las configuraciones que se requiera al hacer el despliegue de la aplicación y el main para que reuna todos los cambios de las ramas anteriores.

## Instalación local

Para ejecutar este proyecto, necesitará agregar las siguientes variables de entorno a su archivo .env

`PORT`

`DATABASE_URL`

Clonar el proyecto

```bash
$ git clone https://github.com/Geffrerson7/simulacion-check-in-aerolinea.git
```

Ir al directorio del proyecto

```bash
$ cd simulacion-check-in-aerolinea
```

Luego instalar las dependencias

```bash
$ npm install
```

Run project

```bash
$ npm run dev
```

Y navegar a la ruta

```sh
http://localahost:PORT/flights/id/passengers
```

## Tecnologías y lenguajes utilizados

* **TypeScript** (v. 4.9.4) [Source](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* **Express** (v. 4.18.2)  [Source](https://www.npmjs.com/package/express)
* **Prisma** (v. 4.9.0) [Source](https://www.prisma.io/docs)
* **nodemon** (v. 2.0.20) [Source](https://www.npmjs.com/package/nodemon)
* **cors** (v. 2.8.5) [Source](https://www.npmjs.com/package/cors)
* **dotenv** (v. 16.0.3) [Source](https://www.npmjs.com/package/dotenv)
* **concurently**  (v. 7.6.0) [Source](https://www.npmjs.com/package/concurrently)
* **ts-node**  (v. 10.9.1) [Source](https://www.npmjs.com/package/ts-node)
* **tslib**  (v. 2.4.1) [Source](https://www.npmjs.com/package/tslib)
* **ts-retry-promise** (v. 0.7.0) [Source](https://www.npmjs.com/package/ts-retry-promise)

## Documentación
La documentación del projecto en Postman está en este [Link](https://documenter.getpostman.com/view/24256278/2s93Y5PKqz)

## Referencias

Para diseñar la lógica de programación del proyecto usé el artículo ["Experimental test of airplane boarding methods"](https://arxiv.org/pdf/1108.5211.pdf) de Jason H. Steffen y Jon Hotchkiss.

## Demo
Para el despliegue del proyecto se utilizó Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://simulacion-check-in-aerolinea.vercel.app)


## Autor
- [Gefferson Casasola](https://github.com/Geffrerson7)
