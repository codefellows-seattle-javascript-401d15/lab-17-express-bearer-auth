# Lab-17
# Patrick Sheridan

## Overview 
The point of this lab was to create a mongo database where a user could sign up and sign in, create, update, get, and delete a photeo gallery

## To Use
With a mongod running, enter the following commands into a new terminal.

### User signup/POST
```
http POST :3000/api/signup username=<username> email=<email> password=<password>
```
### User signin/GET
```
http GET :3000/api/signin -a <username>:<password>
```

### Galley POST
```
http POST :3000/api/gallery name=<picture name> desc=<description> 'Authorization:Bearer'
```
Bearer token can be found in the USER GET/POST response

### Gallery GET
```
http GET :3000/api/gallery/:galleryId 'Authorization:Bearer'
```
### Gallery PUT/Update
```
http PUT :3000/api/gallery/<galleryID> name=<new picture name> desc=<new description> 'Authorization:Bearer' 
```
### Gallery DELETE
```
http DELETE :3000/api/gallery/<galleryID> 'Authorization:Bearer'
```
