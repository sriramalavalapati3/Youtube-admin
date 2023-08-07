# Myanatomy-Initial-project

## Description
This is Bcube admin Pannel , we can able to perform crud operations, DELETE , POST,PATCH, GET, GETBYID.


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

