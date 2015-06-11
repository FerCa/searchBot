var sinon = require('sinon');
var assert = require('chai').assert;
var MilanunciosScraper = require('../lib/webpages/milanuncios/milanunciosscraper');
var fs = require('fs');
var Ad = require('../lib/ad');

suite('MilanunciosScraper', function() {
    var sut;
    var html = fs.readFileSync('./test/fixtures/milanunciosresult.html', {encoding: 'utf8'});

    setup(function() {
        sut = new MilanunciosScraper();
    });

    suite('ExtractAds', function() {

        test('When called with milanuncios results html should return correct array of ads', function() {

            var expectedAds = [
                new Ad('SE VENDE GIBSON EXPLORER ZURDO/A', ' Se vende gibson explorer para zurdo/a.  ' +
                    'Esta IMPECABLE . \nIncluyo estuche rigido. \nno me interesan cambios. \ngracias. ', '800�',
                    'http://www.milanuncios.com/guitarras-electricas/se-vende-gibson-explorer-zurdo-a-149244887.htm',
                    'http://91.229.239.12/fp/1492/44/guitarras-electricas/Se-vende-gibson-explorer-zurdo/a-149244887_1.jpg'),
                new Ad('REBAJA OPORTUNIDAD GUITARRA PARA ZURDOS', ' SE VENDE Schecter  blackjack  diamond series ,  ' +
                    'esta IMPECABLE ,  Incluyo estuche rigido ,  no me interesan cambios ,  Gracias . ', '800�',
                    'http://www.milanuncios.com/guitarras-electricas/rebaja-oportunidad-guitarra-para-zurdos-143346084.htm',
                    'http://91.229.239.12/fp/1433/46/guitarras-electricas/REBAJA-OPORTUNIDAD-guitarra-para-zurdos-143346084_1.jpg'),
                new Ad('OFERTA 2 GUITARRAS ZURDAS AL PRECIO DE 1', ' Se venden 2 guitarrones zurdas al precio de 1. \ngibson explorer' +
                    ' + schecter v = 1550�\nEstan IMPECABLES . \nincluyo fundas rigidas en ambas. \nno me interesan cambios. \ngracias. ',
                    '1.550�', 'http://www.milanuncios.com/guitarras-electricas/oferta-2-guitarras-zurdas-al-precio-de-1-149251932.htm',
                    'http://91.229.239.8/fp/1492/51/guitarras-electricas/Oferta-2-guitarras-zurdas-al-precio-de-1-149251932_1.jpg'),
                new Ad('GIBSON LES PAUL STUDIO ZURDA', ' hola:  se vende guitarra gibson les paul studio zurda,  color vino,  con su ' +
                    'estuche original;  est� pr�cticamente nueva;  poqu�simo uso;  me canso pronto de las aficiones;  precio 900 euros NO negociables;  ' +
                    'tambi�n podr�a vender una electro-ac�stica ibanez,  tambi�n zurda,  con menos uso todav�a que la el�ctrica,  por 150 euros.  ' +
                    'Si alguien quisiera las dos,  se las podr�a dejar en 1000 euros.  No tengo prisa ni necesidad de venderlas,  ' +
                    'pero me da pena tenerlas sin uso y ocupando sitio. ', '900�', 'http://www.milanuncios.com/guitarras-electricas/gibson-les-paul-studio-zurda-157617914.htm',
                    'http://91.229.239.8/fp/1576/17/guitarras-electricas/gibson-les-paul-studio-zurda-157617914_1.jpg')
            ];
            var actualAds = sut.extractAds(html);
            assert.deepEqual(expectedAds, actualAds, 'Incorrect array of ads returned')
        });

    });

});