![Alt Text](https://drive.google.com/uc?export=download&id=1CyobKw-T6LQbv_hdRqAcgxSX-o689QuR)

# Myanatomy-Initial-project

## Description
This is Bcube admin Pannel , we can able to perform crud operations, DELETE , POST,PATCH, GET, GETBYID.
### How to get started with this Application 
### Lets starts by cloning 
``git clone https://github.com/sriramalavalapati3/Myanatomy-Initial-project.git``

### aFter dowloading locally start the react app with command . bcube is foldername 
``npm start``

### connect the data base as your wish like mongoDB atlas , compass

### start the backend with command
``npm start``

### After starting the server. register ur credentials like (username,email,password) use postman or Thunder client as Your wish. Use json format like this in body
``{
"username":"Your username" ,
"email":"Your email",
"password":"password"
}``
### Hit this api to register by passing above details 
``http://localhost8080/api/register``


### After the login from frontend perform crud operations.

# API HIT ROUTES
| Method | Endpoint    | Description                 | Authentication | Status Code |
|--------|-------------|-----------------------------|----------------|-------------|
| GET    | `/api/data` | Retrieve data              | Required       | 200          |
| GET    |`/api/data/:id`| Retrive data by id          |Required        | 200         |
| GET    |`/api/Search`| Retrive data by search        |Required      |  200        |
| POST   |`/api/login` | Login by credentials          | NA           |  200        |
| POST   |`/api/register` | register using Your credentials          | NA           |  200        |
| POST   |`/api/upload` |Post data by             | Required         |  200        |
| PATCH   |`/api/update/:id` |Update data by id             | Required         |  200        |
| DELETE  |`/api/delete/:id` |Delete data by id             | Required         |  200        |



# Database Schema

## AdminSchema
The `adminSchema` defines the structure of the Admin model.

### Fields

- `username` (String, required): The username of the admin.
- `email` (String, required): The email address of the admin.
- `password` (String, required): The password of the admin.

## VideoSchema

### Schema

The `videoSchema` defines the structure of the Video model.

### Fields

- `Title` (String, required): The title of the video.
- `video` (String, required): The URL or path to the video file.
- `description` (String, required): Description of the video content.
- `userID` (String): The user ID associated with the video.


# PostMan Hit Points

Please explore for better understanding of Api Hit points [Docs](https://documenter.getpostman.com/view/24325307/2s9XxzsrYF)


# ReactJs Frontend
bcube is Project of Admin Pannel interface

## Login and Dashboard
Login Page: To access CRUD operations, the admin must log in. On launching the application, the user is directed to the login page where they enter their credentials.

## Authentication:
Upon successful authentication, the admin is granted access to the dashboard.

## Dashboard Page:
The dashboard is the central interface for performing CRUD operations. It consists of card components, each displaying details of an element.

## Card Component: 
Each card displays information about an element. The following details are shown:

## Video Thumbnail
 Description
Overview
Delete Button
Edit Button
Edit and Delete Actions:

Edit: Clicking the "Edit" button on a card opens a dialogue box.
Edit Dialogue Box: The admin can make changes to the details (video, description, overview) and confirm the edit.
Save Edit: Upon clicking the "Edit" button in the dialogue, the changes are saved and the card updates.
Delete: Clicking the "Delete" button prompts a dialogue box.
Delete Dialogue Box: The admin is asked if they're sure they want to delete the element.
Confirm Delete: If the admin confirms deletion, the element is removed from the dashboard.
Upload Section
## Upload Page:
Besides the dashboard, the application also features an upload section for adding new elements.

## Upload Form:
In the upload section, there is an upload form where the admin can input the following details:

Video
Description
Overview
## Submit Upload:
After completing the form, the admin can submit the data.upon succesfull data rendering it will redirect to dashboard

## Data Processing: 
The submitted data is processed, and a new card is generated on the dashboard with the entered details .

## Conclusion

This README provides a high-level overview of the frontend flow for CRUD operations and Backend Hit Points , Database Schema  in the application. By following this flow, the admin can seamlessly log in, manage elements using the dashboard's card components, edit existing elements, delete elements with confirmation, and upload new elements using the upload form.


## Errors should be resolved in near future
:- getting error in connecting mongo-compass to appilication when i dockerise the application , If any one had solution please make it or i will make myself soon .

# This is overview 

## Interface with out login

![Alt Text](https://drive.google.com/uc?export=download&id=1tNgdNl73_s4QXfA3Pb2Fnt6APUcRWIUE)

## Admin Login form 

![Alt Text](https://drive.google.com/uc?export=download&id=1I3_hnBqahsFVmF7gTBA3us8xwYvcwFJb)

## After Login in If You Uploaded the videos Ui Look Like this 

![Alt Text](https://drive.google.com/uc?export=download&id=1i1VvhPt0KcxQhndA1WwM71OqQmpBDzVS)

## Upload form when we click on Upload in sideSection (Note: While uploading the Video If You are using Youtube links use embedded Links like this ``https://www.youtube.com/embed/yGyj0mSfVuk`` )

![Alt Text](https://drive.google.com/uc?export=download&id=1sSf3Gn7f8ZepT045RjISWyVYo37mVFWO)

## Edit dialog box if we click on edit button in any of component

![Alt Text](https://drive.google.com/uc?export=download&id=15T5Ic10_Vv_OFt_GbCiLxJQo4TcGPah0)

## Delete dialog box if we click on delete button in any of component

![Alt Text](https://drive.google.com/uc?export=download&id=1JHHqzi3NMOW7ChoWAupnK8EE6bChVrX1)


# Thank You😊
![SadEyesGIF](https://github.com/sriramalavalapati3/Myanatomy-Initial-project/assets/112754538/468d86fb-38ea-46c7-94dc-60a8cb7e4362)


 

