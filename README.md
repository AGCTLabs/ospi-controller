###REST API and Web Controller interface for Raspberry Pi based irrigation systems valves


This project provides

  - A REST API for your Raspberry pi based irrigation system
  - A Easy to use Web controller interface to control the irrigation system valves

Using the REST API you can build your own custom UI. REST Interface allows you to add, modify,delete and list zones. More importantly it provides control operations to open and shut the irrigation valves.

Web UI uses the REST API to provide simple and easy to use user interface to manage irrigation zones and ctrolling of their valves. This Web UI is also mobile friendly.

REST API and the Web UI are built using [Node JS](http://nodejs.org), [Express JS](http://expressjs.com), [JQuery](http://jquery.com), [Backbone JS](http://backbonejs.org), [Twitter Bootstrap](http://getbootstrap.com/2.3.2/), [Require JS](http://requirejs.org)


![Phone-1](/docs/screenshots/phone-2.png)  ![Phone-1](/docs/screenshots/phone-1.png)


#### Prerequisite
  - [Raspberry Pi](http://raspberrypi.org)
  - [Pi Extension Board to control iggiration system valves](http://rayshobby.net/cart/index.php?route=product/product&path=24&product_id=52)
  - [Git](http://git-scm.com/)
  - [Wiring Pi](http://wiringPi.com)
  - [Node JS](http://nodejs.org)

#### Installation

Once the above setup is done, proceed to install the ospi controller 

````shell
sudo npm install -g ospi-controller
# -g will install ospi-controller globally
````

#### Usage
Once the isntallation is successful try
````shell
  
sudo /opt/sw/node/bin/ospi-controller --help

  Usage: ospi-controller [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -p, --port <port>          HTTP Port to use. Default is 8000
    -c, --config <configFile>  Config file location. Default is config.json
    -l, --log <logFile>        Log file. Default is logs/ospic-server.log
    
# /opt/sw/node is the where the Node is installed. 

````

for example you can start the contoller 
````shell
sudo /opt/sw/node/bin/ospi-controller --config $HOME/ospic-config.json --port 8888
````

This will start the controller at port 8888 and will use /opt/ospic/ospic-config.json as the config file that would provide irrigation zone information. If the file does not exist, a new fill will be saved at this location with zone information created using the web ui.


#####Screenshots
######First time access

So for the very fist time when you login, you need to setup the zones. This the screenshot of no zones scenario.
![No Zones](/docs/screenshots/no-zones.png)

######After adding couple of zones
Following screenshots show creation of two zones. You can click on "Add zone" button to create a zone. Alternatively you can click Settings > Add zone at the top right corner.
![Add Zone](/docs/screenshots/zone-add.png)

One more 

![Add Another Zone](/docs/screenshots/zone-add-1.png)


######After zones are setup. (Default Screen)

Once these two zones are created successfully the home screen would look like.

![Add Another Zone](/docs/screenshots/zones.png)

######Open Zone. 

Now you can click on the open button for a specific zone to open the irrigation valve. Once you clicked on it, it will show the currently opened zones at the top and also it will idicate for how long the zone was open

![Open Zone](/docs/screenshots/open-zone-1.png)

Similarly you can select a particular zone using the nav bar and click on the open button for that zone. That way you can open multiple zones and all the open zones will show at the top. You can either select a single zone and shut or shut all the zones at onces.

![Open Zone](/docs/screenshots/open-zone-3.png)

######Update Zone
It is also possible to update and delete a zone.
![Open Zone](/docs/screenshots/zone-update.png)

