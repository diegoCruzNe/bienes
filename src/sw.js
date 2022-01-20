importScripts('ngsw-worker.js');

//const notificacion = require('./app/Clases/notificacion.ts');
//const service = require('./app/Service/service.service');
//import { Notificacion } from '../Clases/notificacion';
//id_usuario = sessionStorage.getItem("id_usuario");
//import { ServiceService } from '../Service/service.service';
//notificacion: Notificacion[];
//Escuchar push

/* service.notificacion_mensaje(3)
    .subscribe(data => {
        notificacion.title = data[0]["title"];
        notificacion.contenido = data[0]["contenido"];
        console.log(notificacion.title);
        console.log(notificacion.contenido);
    }); */
self.addEventListener('push', e => {
    /*     var titles = 0;
        if (!sessionStorage.getItem("title")) {
            titles = 0;
        } else {
            titles = sessionStorage.getItem("title");
        }
        //console.log(e);
        console.log("hola"); */

    const title = "Te saluda Five";

    console.log(e.data.text());
    const options = {
        body: e.data.text(),
        icon: 'assets/img/logo_five_v3_72x72.png',
        vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600],
        badge: 'assets/img/favicon.ico',
        data: {
            url: '/'
        }
    };
    //console.log(title);
    e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclose', e => {
    console.log('Notificacion cerrada', e);
});

self.addEventListener('notificationclick', e => {
    const notificacion = e.notification;

    const respuesta = clients.matchAll().then(clientes => {
        let cliente = clientes.find(c => {
            return c.visibilityState === 'visible';
        });

        if (cliente !== undefined) {
            cliente.navigate(notificacion.data.url);
            cliente.focus();
        } else {
            clients.openWindow(notificacion.data.url);
        }
        notificacion.close();
    });
    e.waitUntil(respuesta);
});
