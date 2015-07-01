# searchBot - Client side saved searches

[![Build Status](https://travis-ci.org/FerCa/searchBot.svg?branch=master)](https://travis-ci.org/FerCa/searchBot)
[![codecov.io](http://codecov.io/github/FerCa/searchBot/coverage.svg?branch=master)](http://codecov.io/github/FerCa/searchBot?branch=master)

searchBot is a command line tool to save searches to e-commerce, online thrift shops or any other webpage providing 
searches for products, and then receive emails every time a new product matches the search.

Some e-commerce sites like ebay provides the concept of "saved searches", you can save a search and receive alerts every time 
a new product matches your search, but many others don't. With searchbot you can use one of the implemented webpage 
scrapers, register your search and receive emails every time there are new items in your search.

## Configuration

### Configure searchBot

To configure searchBot you need to edit the settings.js file that you will find in the root of the project.

You can configure a lot of things but the only thing you really need to worry about is the nodemailer configuration. You will
need to configure it with a valid email account that searchBot will use to send you emails. 
See https://github.com/andris9/Nodemailer for documentation about how to configure nodemailer for your email account.

### Register your searches

You can register new searches by simply editing the searches.js config file you will find in the root of the project:

```javascript
var searches = [{
    name: 'left-handed guitars',
    where: [
        { page: 'milanuncios', searchUrl: 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1' },
        { page: 'wallapop', searchUrl: 'http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056' }
    ],
    notifyTo: somemail@mail.com
}];
```
You just need to put an object (a POJO) inside the searches array with this keys:

* name: A name for this search (this will be in the subject of the email you will receive for new ads).
* where: An array of objects declaring the target pages, with the keys:
   *  page: This will be the name of one of the implemented webpages (be sure to write it identically to the name of the directory inside webpages directory (./lib/webpages).
   *  searchUrl: The url of a valid and working search for the chosen page.
* notifyTo: The target email where searchbot will notify new ads.

Of course you can add as many searches as you want to the searches array to receive email notifications for multiple concepts.

## Install and run searchBot easily with docker

Searchbot requires mongodb, node, npm and a job scheduler to run it periodically. Instead of installing all this in your machine 
you can use the searchbot docker image to install and run it in any platform in a much more easier way.

First you will need to install docker in your system:
https://docs.docker.com/installation/

Be sure to check that the docker daemon is running.

Next create a settings file and a searches file as described above in "Configure searcBot" and "Register your searches".

Then you can use the command "docker run" to get the searchbot docker image and run it in a container:

```bash
docker run -d -v <PATH_TO_YOUR_SEARCHES_FILE>/searches.js:/var/searchBot/searches.js -v <PATH_TO_YOUR_SETTINGS_FILE>/settings.js:/var/searchBot/settings.js ferca/searchbot
```

And voila! Now you have searchBot installed and running in a isolated container! It's configured to check for new ads every day at 2:30AM.

### Adding more searches

Since your searches file and your settings file are mounted inside the docker container you can add new searches by simply
editing the searches.js file in your local machine and the changes will take efect in the next searchBot execution.

### Get familiar with docker

With Docker you will be able to see the container logs, execute a bash interactive session inside de container, get a new version
of searchBot (downloading the latest image).  I encourage you to read the [docker documentation](https://docs.docker.com/) and get familiar with the concepts 
and tools. It's an awesome tool!
