###REST and Web Controller interface for Raspberry Pi based irrigation systems's sprinkler valve control


This project provides

  - A REST Interface for your Raspberry pi based irrigation system
  - A Easy to use Web controller interface to control the irrigation system


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
