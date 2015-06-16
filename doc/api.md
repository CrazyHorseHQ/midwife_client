#Introduction

This page serves as the API doc for the SMART API. In it, we've tried to describe all of the requests and resources that the API will serve. We've purposely steered clear of describing each and every field in each and every call—such API docs rapidly grow in our experience—and instead supply examples of each request-response combo as the most effective way to show how to use the API. Many of the fields are self-explanatory but where necessary we provide a description.

As with anything, this is far from perfect or 100% accurate, so if you spot an inaccuracy or have a question about any of the content, please let us know at [The Product Works](http://www.theproduct.works/about-us/)

#Navigate the doc

- [Authentication](#authentication)
	- [/login](#post-login)
	- [/logout](#post-logout)
- [User Account Management](#user-account-management)
    - [/reset_password](#post-reset_password)
    - [/reset_passwords/:TOKEN](#put-reset_passwords-token)
- [Appointments](#appointments)
    - [Get info on all appointments - GET /appointments](#get-appointments)
    - [Make an appointment - POST /appointments](#post-appointments)
    - [Get info on a single appointment - GET /appointments/:APPOINTMENT_ID](#get-appointmentsappointment_id)
    - [Update an appointment - PUT /appointments/:APPOINTMENT_ID](#put-appointmentsappointment_id)
- [Service Users](#service-users-resource)
    - [Get info on all service users - GET /service_users](#get-service_users)
    - [Get info on a specific  service user - GET /service_users/:ID](#get-service_usersid)
    - [Create an new  service user - POST /service_users](#post-service_users)
    - [Update a  service user's details - PUT /service_users/:ID](#put-service_usersid)
- [Service Providers](#service-providers-resource)
    - [Get info on all service providers - GET /service_providers](#get-service_providers)
    - [Get info on a specific service provider - GET /service_providers/:ID](#get-service_providersid)
    - [Create an new service provider - POST /service_providers](#post-service_providers)
    - [Update a service provider's details - PUT /service_providers/:ID](#put-service_providersid)
- [Pregnancy Resources](#pregnancies-resource)
    - [Get info on all pregnancies - GET /pregnancies](#get-pregnancies)
    - [Get info on a specific pregnancy - GET /pregnancies/:ID](#get-pregnanciesid)
    - [Make an new pregnancy record - POST /pregnancies](#post-pregnancies)
    - [Update a pregnancy record - PUT /pregnancies/:ID](#put-pregnanciesid)
- [Baby Record Resources](#babies-resources)
    - [Get all baby records - GET /babies](#get-babies)
    - [Get a single baby record - GET /babies:ID](#get-babiesid)
    - [Create a new baby record - POST /babies](#post-babies)
- [Clinic Time Record Resources](#clinic-time-records-resource)
    - [Get times for a clinic and date - GET /clinics/:CLINIC_ID/time_records?date=2015-05-29](#get-clinicsclinic_idtime_recordsdate2015-05-29)
    - [Update a single clinic's times based on date - PUT /clinics/:CLINIC_ID/time_records](#put-clinicsclinic_idtime_records)
- [Anti D History Resources](#anti-d-histories-resources)
    - [Get history for a pregnancy - GET /anti_dhistories?pregnancy_id=1](#get-anti_dhistoriespregnancy_id1)
    - [Get info for a particular history object - GET /anti_dhistories/1](#get-anti_dhistories1)
- [Pregnancy Note Resources](#pregnancy-note-resources)
    - [Get notes for a pregnancy - GET /pregnancies/1/notes](#get-pregnancies1notes)
    - [Create new note for a pregnancy - POST /pregnancies/1/notes](#post-pregnancies1notes)

#Authentication

All requests to the SMART API must be within the bounds of an authenticated user session. The Client must make the necessary request for a secret token; this must then be sent in every subsequent API requests as a header, ``Auth-Token``.

In order to create and destroy a session, the following calls are supported:

  1. `login`: returns a unique ``Auth-Token`; this must be use in all subsequent API requests to the server. [See `login`](#post-login).
  2. `logout`: destroys the user session and effectively disables the Auth-Token from further use. [See `logout`](#post-logout)

**NOTE**

If the ```Auth-Token``` becomes invalid or expired for any reason, such as a ```service_provider``` becoming inactive, then the API will return a 401 response to any authenticated request. At that point any client should destroy any stored data on the device and show the login screen.

----------

##POST /login

####Notes
* Allows that a SMART client to login to SMART backend with username and password.
* Returns the ID of the client user and a unique auth token to be used in all subsequent API calls.

####Input
* ``username`` and ``password``: account details of the Service Provider account set-up for these client connections
* json as Content-Type'

####Output
* Login session token
* Internal ID of the Service Provider account

####Example:

```bash
  $ curl -X POST http://54.72.7.91:8888/login \
    -d '{"login":{"username":"conor_wogan","password":"myPassword123"}}' \
    -H "Content-Type: application/json"

  {
    "login": {
      "token": "S3cr3t",
      "id": 234
    }
  }
```
----------
##POST /logout

####Notes
* Ends the user login session

####Input
* Session token that was generated by the [/login](#post-login) request as ``Auth-Token``

####Output
* Nothing much

####Example:

```bash
  $ curl -X POST http://54.72.7.91:8888/logout \
    -H "Auth-Token: S3cr3t"

  {
    "login": {
      "token": null
    }
  }
```
----------

# Authorization
=============

The SMART API will only talk to clients that it knows - strangers aren't welcome! This is achieved by using an [``Api-Key``](https://github.com/TheProductWorks/smart_app#api-key) ("api_key"). A unique api_key is manually generated for a legitimate client and stored securely in an API_key directory in the SMART server backend. Then, when that client makes a request to the API with the api_key, the SMART server will lookup the api_key in its internal directory. If it's valid, then the API will respond nicely; if it's not, then it's 401 all the way!

To request an api_key, take a read [here](https://github.com/TheProductWorks/smart_app#api-key).

Note: if you have SMART installed locally, you need to insert a unique string as key into the ```api_key``` table, then use that key in subsequent API requests.

__IMPORTANT: the ```Api-Key``` must be included in each API request (other than [/login](#post-login) and [/logout](#post-logout)) and it must match the key stored in the SMART backend.__

----------
## POST /reset_passwords

####Notes
* Request user details of the Service Provider account that needs to be reset

####Input
* email address and username of the Service Provider account to be reset
* Trusty old Api-Key

####Output
* Internal user ID of the user account that is being reset

####Example:

```
$ curl -X POST 54.72.7.91:8888/reset_passwords \
  -d "{"email":"sp@sp.com","username":"sp"}" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "reset_password": {
    "id": 123,
    "service_user_id": 125
  }
}
```

----------

## PUT /reset_passwords/:TOKEN

####Notes

* Reset the password for a specified Service Provider

####Input

* Passwords old and new

###Output

* Service User's internal ID as confirmation

####Example:

```
$ curl -X PUT 54.72.7.91:8888/reset_passwords/S3cr3tT0k3n \
  -d "{"password":"newPwd1234","password_verification":"newPwd1234"}" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "reset_password": {
    "id": 123,
    "service_user_id": 125
  }
}
```
----------

#Appointments

Actions available to act on the Appointments resource. Deals with everything that has to do with appointments through a completely [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) interface.

## GET /appointments

####Notes

* List all appointments.
* Can be filtered using query string params on date and clinic_id(s).

####Inputs

* Nothing much... just don't forget the Api-Key or Auth-Token

####Output

* Big list of appointments and the data for each

####Example:

```
$ curl -X GET 54.72.7.91:8888/appointments -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "appointments": [
        {
            "id": "1",
            "date": "2014-12-12",
            "time": "12:12:00",
            "service_provider_id": "125",
            "service_user_id": "345",
            "priority": "other",
            "visit_type": "post-natal",
            "service_option_ids": []
        },
        { ... }
    ]
}
```

----------

## POST /appointments

####Notes

* Create a new appointment with date, time, priority, visit_type, clinic_id and service_user_id

####Inputs

* 'date' of the appointment
* 'time' of the appointment
* 'priority' of the appointment. One of: 'drop-in', 'scheduled'.
* 'visit_type' says if it's "post-natal" or "ante-natal"
* 'return_type' says if it's a new visit or a return visit. One of ['returning', 'new']
* 'service_provider_id' is the internal ID of the Service Provider trying to book this appointment
* 'service_user_id' is the internal ID of the client for whom the appointment is for
* 'clinic_id' is the internal ID of the clinics that are geographically spread across Dublin & [Wicklow](https://www.google.ie/search?q=beautiful+wicklow&es_sm=122&source=lnms&tbm=isch&sa=X&ei=R9nAVK7HDIq2UfeJg_AG&ved=0CAgQ_AUoAQ&biw=1366&bih=643#tbm=isch&q=beautiful+enniskerry&imgdii=_).

####Example:
```
$ curl -X POST 54.72.7.91:8888/appointments \
  -d '{"appointment":{"date":"2015-03-12","time":"09:00","service_provider_id":"1","service_user_id":"1","clinic_id":"7","priority":"scheduled","visit_type":"ante-natal", "return_type": "returning"}}'\
  -H "Auth-Token: S3cr3t" \
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -b /tmp/cookies.txt

{
    "appointment": {
        "clinic_id": 7,
        "date": "2015-03-12",
        "id": 62,
        "links": {
            "service_options": "/appointments/62/service_options",
            "service_provider": "service_providers/1",
            "service_user": "service_users/1"
        },
        "priority": "scheduled",
        "service_option_ids": [],
        "service_provider_id": 1,
        "service_user": {
            "gestation": null,
            "id": 1,
            "name": "Shannon Mercury"
        },
        "service_user_id": 1,
        "time": "09:00:00",
        "visit_logs": [],
        "visit_type": "post-natal"
    }
}

```

NOTE:

Any validation errors will appear in an errors key like so

```
"errors": {
  "Appointment taken": "A slot for a further 15 minute appointment has already been taken"
}
```

----------

## GET /appointments/:APPOINTMENT_ID

####Notes
Show details of appointment looked up by `Appointment ID`

####Input
####Output

####Example

```
$ curl -X GET 54.72.7.91:8888/appointments/62  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "appointments": {
        "date": "2014-12-12",
        "id": "1",
        "service_provider_id": "125",
        "service_user_id": "345",
        "priority": "other",
        "time": "12:12:00",
        "visit_type": "post-natal",
        "service_option_ids": [1],
        "links": {
          "service_options": "/appointments/1/service_options"
        }
    },
}
```

---------

## PUT /appointments/:APPOINTMENT_ID

####Notes
 * Update details of appointment looked up by `ID`

####Input

* 'date' of the appointment
* 'time' of the appointment
* 'service_provider_id' is the internal ID of the Service Provider trying to book this appointment
* 'attended' says if the appointment was attended. Either true or false, false by default until made true.

####Output

####Example:
```
$ curl -X PUT 54.72.7.91:8888/appointments/1 \
  -d '{"date":"2014-12-12","time":"13:00:00","service_provider_id":1,"attended":true}'\
  -H "Content-Type: application/json"\
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -b /tmp/cookies.txt

{
    "appointments": {
        "date": "2014-12-20",
        "id": "1",
        "service_provider_id": "2",
        "service_user_id": "345",
        "priority": "other",
        "attended": true,
        "time": "13:00:00",
        "visit_type": "post-natal"
    }
}
```

----------

## DELETE /appointments/:APPOINTMENT_ID

####Notes
* Delete appointment looked up by `ID` if no notes have been taken related to it.

####Input
####Output

####Example

```
$ curl -X DELETE 54.72.7.91:8888/appointments/1 \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "appointments": {
        "date": "2014-12-20",
        "id": "1",
        "service_provider_id": "2",
        "service_user_id": "345",
        "priority": "other",
        "time": "13:00:00",
        "visit_type": "post-natal"
    }
}
```
----------

#ServiceOptions Resource

ServiceOptions to be applied to Clinics and Appointments. ServiceOptions are the terminology we came up with to create a loose relationship between the entities listed above. Creating service options are locked down Admin users only.

## GET /service_options

####Notes
* Get all the service_options that are in the system

####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/service_options  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "service_options": [
    {
      "id": 1,
      "name": "Dublin"
    },
    ...
  ]
}
```
----------

## GET /service_options/:ID

####Notes
* Get a specific service_option


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/service_options/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "service_options": {
    "id": 1,
    "name": "Dublin"
  }
}
```
---------

Appointment ServiceOptions Resource
=========================

Nested endpoint to list, apply or remove service options from Appointments.

## GET /appointments/:ID/service_options

####Notes
* Return all service_options associated with the appointment


####Input
####Output

####Example
```bash
$ curl -X get 54.72.7.91:8888/appointments/1/service_options  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "service_options": [
        {
            "id": 1,
            "name": "new_service_option"
        },
        ...
    ]
}
```
----------

## POST /appointments/:ID/service_options

####Notes
* Add new service_option to the appointment


####Input
####Output

####Example
```bash
$ curl -X POST 54.72.7.91:8888/appointments/1/service_options \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -d '{"service_option": {"id":1}}' -H 'Content-Type: application/json'

{
    "service_options": {
        "id": 1,
        "name": "new_service_option"
    }
}
```
----------
## DELETE /appointments/:ID/service_options/:ID

####Notes
* Remove service_option from appointment


####Input
####Output

####Example
```bash
$ curl -X DELETE 54.72.7.91:8888/appointments/1/service_options/1 \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
    "service_options": {
        "id": 1,
        "name": "new_service_option"
    }
}
```
----------

#Clinic Resource

CRUD API to deal with Clinics.

## GET /clinics

####Notes
Get all the clinics that are in the system


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/clinics  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "clinics": [
    {
      "id": 1,
      "name": "Dun Laoghaire",
      "address": "George's Street",
      "opening_time": "9:00",
      "closing_time": "17:00",
      "recurrence": "weekly",
      "type": "booking",
      "appointment_interval": 15,
      "days": {
        "monday": true,
        "tuesday": false,
        "wednesday": true,
        "thursday": false,
        "friday": false,
        "saturday": false,
        "sunday": false
      },
      "service_option_ids": []
    },
    ...
  ]
}
```
------------

### Query string params

# service_option_id

Filter clinics results based on service_option_id

## GET /clinics/:ID
####Notes

Get a specific clinic

####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/clinics/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "clinics": {
    "id": 1,
    "name": "Dun Laoghaire",
    "address": "George's Street",
    "opening_time": "9:00",
    "closing_time": "17:00",
    "recurrence": "weekly",
    "type": "booking",
    "appointment_interval": 15,
    "days": {
      "monday": true,
      "tuesday": false,
      "wednesday": true,
      "thursday": false,
      "friday": false,
      "saturday": false,
      "sunday": false
    },
    "service_option_ids": []
  }
}
```
----------

## PUT /clinics/:ID

####Notes
* Update a specific clinic


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/clinics/1 \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json' \
  -d '{"clinic": {"name": "New Clinic", "address": "George's Street"}}'

{
  "clinics": {
    "id": 1,
    "name": "New Clinic",
    "address": "George's Street",
    "opening_time": "9:00",
    "closing_time": "17:00",
    "recurrence": "weekly",
    "type": "booking",
    "appointment_interval": 15,
    "days": {
      "monday": true,
      "tuesday": false,
      "wednesday": true,
      "thursday": false,
      "friday": false,
      "saturday": false,
      "sunday": false
    },
    "service_option_ids": []
  }
}
```
-------------

## DELETE /clinics/:ID

#####Notes
* Delete a specific clinic


####Input
####Output

####Example

```bash
$ curl -X GET 54.72.7.91:8888/clinics/1 \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "clinics": {
    "id": 1,
    "name": "New Clinic",
    "address": "George's Street",
    "opening_time": "9:00",
    "closing_time": "17:00",
    "recurrence": "weekly",
    "type": "booking",
    "appointment_interval": 15,
    "days": {
      "monday": true,
      "tuesday": false,
      "wednesday": true,
      "thursday": false,
      "friday": false,
      "saturday": false,
      "sunday": false
    },
    "service_option_ids": [1,2]
  }
}
```
----------

## POST /clinics

####Notes
* Create new clinic


####Input
####Output

####Example

```bash
$ curl -X POST 54.72.7.91:8888/clinics \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json' \
  -d '{"clinic": {"name": "New Clinic", "address": "George's Street"}}'

{
  "clinics": {
    "id": 14,
    "name": "New Clinic",
    "address": "George's Street",
    "recurrence": "weekly",
    "type": "booking",
    "appointment_interval": 15,
    "days": {
      "monday": false,
      "tuesday": false,
      "wednesday": false,
      "thursday": false,
      "friday": false,
      "saturday": false,
      "sunday": false
    }
  }
}
```
-----------

#Clinic Announcements Resource

These announcements/notes are in place to notify the midwives on rota in case there's a shortage of X in the clinics, or for some reason only take emergency bookings for a specific day for a clinic.

## GET /clinics/:ID/announcements

####Notes
* Get all announcements for a clinic


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/clinics/1/announcements  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "announcements": [
    {
      "id": 1,
      "note": "No bookings please on Monday",
      "date": "2014-08-11",
      "blocking": true
    },
    ...
  ]
}
```
----------

## GET /clinics/:ID/announcements/:ID

####Notes
* Get specific announcements for a clinic


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/clinics/1/announcements/2  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "announcements": {
    "id": 2,
    "note": "Need more things",
    "date": "2014-08-11",
    "blocking": false
  }
}
```
----------

## POST /clinics/:ID/announcements

#Notes
* Create announcements for a clinic


####Input
####Output

####Example
```bash
$ curl -X POST 54.72.7.91:8888/clinics/1/announcements \
  -H "Auth-Token: S3cr3t" \
  -H 'Content-Type: application/json' \
  -H "Api-Key: 3g3tyh43gswe" \
  -d '{"note": "No bookings please on Monday","date": "2014-08-11","blocking": true}'

{
  "announcements": [
    {
      "id": 1,
      "note": "No bookings please on Monday",
      "date": "2014-08-11",
      "blocking": true
    },
    ...
  ]
}
```
-----------

## DELETE /clinics/:ID/announcements/:ID

####Notes
* Delete specific announcements for a clinic


####Input
####Output

####Example
```bash
$ curl -X DELETE 54.72.7.91:8888/clinics/1/announcements/2 \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "announcements": {
    "id": 2,
    "note": "Need more things",
    "date": "2014-08-11",
    "blocking": false
  }
}
```

#Clinic Time Records Resource

These records are updated through the API to allow the hospital to perform reporting on when midwives started and ended their clinics.

## GET /clinics/:CLINIC_ID/time_records?date=2015-05-29

####Notes
* Get start_time and end_time for a particular date and clinic


####Input

* 'date': as a GET param to specify what date the client currently has open
* 'clinic_id': as part of the resource to specify what clinic to query

####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/clinics/1/time_records?date=2015-05-29  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "clinic_time_records": [
    {
      "id": 1,
      "start_time": "2015-05-28 13:00:00",
      "end_time": "2015-05-28 17:00:00",
      "clinic_id": 2
    },
    ...
  ]
}
```

## PUT /clinics/:CLINIC_ID/time_records

####Notes
* Update start_time and end_time for a clinic and date


####Input

* 'date': The date that the client is currently looking at
* 'start_time': The start time that the client wants to submit
* 'end_time': The end time that the client wants to submit
* 'clinic_id': The clinic that the client is currently looking at

####Output

####Example
```bash
$ curl -X PUT 54.72.7.91:8888/clinics/2/time_records  -d '{"date":"2015-06-04","start_time":"2015-06-04 14:00:00","end_time":"2015-06-04 16:00:00"' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H 'Content-Type: application/json'

{
  "clinic_time_record": [
    {
      "id": 1,
      "start_time": "2015-05-28 13:00:00",
      "end_time": "2015-05-28 17:00:00",
      "clinic_id": 2
    },
    ...
  ]
}
```

---------

#Service Users Resource

## GET /service_users

####Notes
* List all service_users


####Input
####Output

####Example
```
$ curl -X GET 54.72.7.91:8888/service_users  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "service_users": [
    {
      "clinical_fields": {
        "blood_type": "A+",
        "estimated_delivery_date": "2015-03-03"
      },
      "id": 1,
      "hospital_number": "H2345245",
      "personal_fields": {
        "home_address": "Scapemanus\nNavan\nCo Meath",
        "home_type": "apartment",
        "home_county": "Dublin",
        "home_post_code": "D2",
        "directions": "Turn left at the thing",
        "dob": "1988-04-03",
        "email": "smyth@gmail.com",
        "home_phone": "0852351234",
        "mobile_phone": "0852351234",
        "name": "John Smyth",
        "next_of_kin_phone": "0852351234",
        "next_of_kin_name": "John Smith"
      }
    }
  ],
  "pregnancies": [...],
  "babies": [...],
  "anti_d_histories": [...]
}
```
-----------

### Query string params

#### name

Partial case insensitive search for Service User name.

#### dob

Exact match lookup for Service User date of birth.

#### hospital_number

Hospital number lookup.

----------
## GET /service_users/:ID

####Notes
* Show details of service_user looked up by `ID`


####Input
####Output

####Example

```
$ curl -X GET 54.72.7.91:8888/service_users/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "service_users": [
    {
      "clinical_fields": {
        "blood_type": "A+",
        "estimated_delivery_date": "2015-03-03"
      },
      "id": 1,
      "hospital_number": "H2345245",
      "personal_fields": {
        "home_address": "Scapemanus\nNavan\nCo Meath",
        "home_type": "apartment",
        "home_county": "Dublin",
        "home_post_code": "D2",
        "directions": "Turn left at the thing",
        "dob": "1988-04-03",
        "email": "smyth@gmail.com",
        "home_phone": "0852351234",
        "mobile_phone": "0852351234",
        "name": "John Smyth",
        "next_of_kin_phone": "0852351234",
        "next_of_kin_name": "John Smith"
      }
    }
  ],
  "pregnancies": [ ... ],
  "babies": [ ... ],
  "anti_d_histories": [...]
}
```

-----------

## POST /service_users

####Notes
* Create a new Service User

####Input
####Output

####Example
```
$ curl -X POST 54.72.7.91:8888/service_users \
  -d '{"service_user":{"hospital_number":"H2345245", "clinical_fields":{"blood_type":"A+","estimated_delivery_date":"2015-03-03"},"personal_fields":{"home_address":"Scapemanus\nNavan\nCo Meath", "home_post_code": "D2", "home_type": "apartment", "home_county": "Dublin","directions": "Turn left at the thing","dob": "1988-04-03","email":"smyth@gmail.com","home_phone":"0852351234","mobile_phone": "0852351234","name": "John Smyth","next_of_kin_phone": "0852351234", "next_of_kin_name": "John Smith"}}}'\
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H "Auth-Token: S3cr3t" \

{
  "service_user": {
    "clinical_fields": {
      "blood_type": "A+",
      "estimated_delivery_date": "2015-03-03"
    },
    "id": 1,
    "hospital_number": "H2345245",
    "personal_fields": {
      "home_address": "Scapemanus\nNavan\nCo Meath",
      "home_type": "apartment",
      "home_county": "Dublin",
      "home_post_code": "D2",
      "directions": "Turn left at the thing",
      "dob": "1988-04-03",
      "email": "smyth@gmail.com",
      "home_phone": "0852351234",
      "mobile_phone": "0852351234",
      "name": "John Smyth",
      "next_of_kin_phone": "0852351234",
      "next_of_kin_name": "John Smith"
    }
  }
}
```
----------

## PUT /service_users/:ID

####Notes
* Update details of Service User looked up by `ID`


####Input
####Output

####Example
```
$ curl -X PUT 54.72.7.91:8888/service_users/1 \
  -d '{"service_user":{"hospital_number":"H2345245", "clinical_fields":{"blood_type":"A+","estimated_delivery_date":"2015-03-03"},"personal_fields":{"home_address":"Scapemanus\nNavan\nCo Meath","directions": "Turn left at the thing","dob": "1988-04-03","email":"smyth@gmail.com","home_phone":"0852351234","mobile_phone": "0852351234","name": "John Smyth","next_of_kin_phone": "0852351234", "next_of_kin_name": "John Smith"}}}'\
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H "Auth-Token: S3cr3t" \

{
  "service_user": {
    "clinical_fields": {
      "blood_type": "A+",
      "estimated_delivery_date": "2015-03-03"
    },
    "id": 1,
    "hospital_number": "H2345245",
    "personal_fields": {
      "home_address": "Scapemanus\nNavan\nCo Meath",
      "home_type": "apartment",
      "home_county": "Dublin",
      "home_post_code": "D2",
      "directions": "Turn left at the thing",
      "dob": "1988-04-03",
      "email": "smyth@gmail.com",
      "home_phone": "0852351234",
      "mobile_phone": "0852351234",
      "name": "John Smyth",
      "partner_phone": "0852351234"
    }
  }
}
```

#Service Providers Resource

CRUD interface for Service Providers. The API is locked down for Admin users only.

## GET /service_providers

####Notes
* List all service_providers


####Input
####Output

####Example
```
$ curl -X GET 54.72.7.91:8888/service_providers  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "service_providers": [
    {
      "id": 1,
      "name": "Mary Murray",
      "username": "Mary M",
      "email": "caprisun@nmh.ie",
      "password": "*********",
      "active": true,
      "admin": true,
      "job_occupation": "Community Midwife",
      "job_level": "Resident",
      "primary_phone": "0865656777",
      "secondary_phone": "0865656777"
    },
    ...
  ]
}
```

## GET /service_providers/:ID

####Notes
* Show details of service_providers looked up by `ID`


####Input
####Output

####Example
```
$ curl -X GET 54.72.7.91:8888/service_providers/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "service_provider": {
    "id": 1,
    "name": "Mary Murray",
    "username": "Mary M",
    "email": "caprisun@nmh.ie",
    "password": "*********",
    "active": true,
    "admin": true,
    "job_occupation": "Community Midwife",
    "job_level": "Resident",
    "primary_phone": "0865656777",
    "secondary_phone": "0865656777"
  }
}
```
-----------

## POST /service_providers

####Notes
* Create a new Service Provider

####Input
####Output

####Example
```
$ curl -X POST 54.72.7.91:8888/service_providers \
  -d '{"service_provider": {"id": 1, "name": "Mary Murray", "username": "Mary M", "email": "caprisun@nmh.ie", "password": "*********", "active": true, "admin": true, "job_occupation": "Community Midwife", "job_level": "Resident", "primary_phone": "0865656777", "secondary_phone": "0865656777"}}'\
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H "Auth-Token: S3cr3t" \

{
  "service_provider": {
    "id": 1,
    "name": "Mary Murray",
    "username": "Mary M",
    "email": "caprisun@nmh.ie",
    "password": "*********",
    "active": true,
    "admin": true,
    "job_occupation": "Community Midwife",
    "job_level": "Resident",
    "primary_phone": "0865656777",
    "secondary_phone": "0865656777"
  }
}
```
-----------

## PUT /service_providers/:ID

####Notes
* Update details of service_providers looked up by `ID`


####Input
####Output

####Example
```
$ curl -X PUT 54.72.7.91:8888/service_providers/1 \
  -d '{"service_provider": {"id": 1, "name": "Mary Murray", "username": "Mary M", "email": "caprisun@nmh.ie", "password": "*********", "active": true, "admin": true, "job_occupation": "Community Midwife", "job_level": "Resident", "primary_phone": "0865656777", "secondary_phone": "0865656777"}}'\
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H "Auth-Token: S3cr3t" \

{
  "service_provider": {
    "id": 1,
    "name": "Mary Murray",
    "username": "Mary M",
    "email": "caprisun@nmh.ie",
    "password": "*********",
    "active": true,
    "admin": true,
    "job_occupation": "Community Midwife",
    "job_level": "Resident",
    "primary_phone": "0865656777",
    "secondary_phone": "0865656777"
  }
}
```
-----------

#Pregnancies Resource

Create, Query and Update Pregnancy data

## GET /pregnancies

#####Notes
* List all pregnancies


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/pregnancies  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "pregnancies": [
    {
      "id": 1,
      "service_user_id": 1,
      "estimated_delivery_date": "2014-07-23",
      "additional_info": "N/A",
      "birth_mode": ["Forceps", "Svd"],
      "perineum": "",
      "anti_d": "",
      "feeding": "",
      "last_menstrual_period": "",
      "gestation": "23 + 4"
    }
  ]
}
```
-----------

## GET /pregnancies/:ID

#####Notes
Get data for a specific pregnancy


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/pregnancies/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "pregnancy": {
    "id": 1,
    "service_user_id": 1,
    "estimated_delivery_date": "2014-07-23",
    "additional_info": "N/A",
    "birth_mode": ["Forceps", "Svd"],
    "perineum": "",
    "anti_d": "",
    "feeding": "",
    "last_menstrual_period": "",
    "gestation": "23 + 4"
  }
}
```
-----------

## POST /pregnancies

####Notes
* Create a new pregnancy


####Input
####Output

####Example
```bash
$ curl -X POST 54.72.7.91:8888/pregnancies \
  -d '{"pregnancy": {"service_user_id": 1, "estimated_delivery_date": "2014-07-23", "additional_info": "N/A", "birth_mode": ["Svd"], "perineum": "", "anti_d": "", "feeding": "", "last_menstrual_period": ""}}'
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H "Auth-Token: S3cr3t"

{
  "pregnancy": {
    "id": 1,
    "service_user_id": 1,
    "estimated_delivery_date": "2014-07-23",
    "additional_info": "N/A",
    "birth_mode": ["Svd"],
    "perineum": "",
    "anti_d": "",
    "feeding": "",
    "last_menstrual_period": "",
    "gestation": "23 + 4"
  }
}
```
-----------

## PUT /pregnancies/:ID

####Notes
Update pregnancy


####Input
####Output

####Example
```bash
$ curl -X PUT 54.72.7.91:8888/pregnancies \
  -d '{"pregnancy": {"service_user_id": 1, "estimated_delivery_date": "2014-07-23", "additional_info": "N/A", "birth_mode": ["Svd"], "perineum": "", "anti_d": "", "feeding": "", "last_menstrual_period": ""}}'
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -H "Auth-Token: S3cr3t"

{
  "pregnancy": {
    "id": 1,
    "service_user_id": 1,
    "estimated_delivery_date": "2014-07-23",
    "additional_info": "N/A",
    "birth_mode": ["Svd"],
    "perineum": "",
    "anti_d": "",
    "feeding": "",
    "last_menstrual_period": "",
    "gestation": "23 + 4"
  }
}
```
-----------

#Babies Resources

## GET /babies

####Notes
* Get a full list of all baby records in the system

####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/babies  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "babies": [
    {
      "id": 1,
      "pregnancy_id": 1,
      "hospital_number": "H9999999",
      "gender": "male",
      "weight": 3720,
      "delivery_date_time": "2014-07-24 12:12:12",
      "vitamin_k": "yes",
      "hearing": "test passed",
      "newborn_screening_test": "passed"
    },
    ...
  ]
}
```
----------

## GET /babies:ID

####Notes
* Get a baby record for a given baby in the system


####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/babies/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "baby": {
    "id": 1,
    "pregnancy_id": 1,
    "hospital_number": "H9999999",
    "gender": "male",
    "weight": 3720,
    "delivery_date_time": "2014-07-24 12:12:12",
    "vitamin_k": "yes",
    "hearing": "test passed",
    "newborn_screening_test": "passed",
    "birth_outcome": "Liveborn"
  }
}
```
---------
## POST /babies

####Notes
* Create a new Baby record

####Input
####Output

####Example
```bash
$ curl -X POST 54.72.7.91:8888/babies \
  -d '{"baby": {"pregnancy_id":1, "hospital_number": "H9999999", "gender": "male", "weight": 3720, "delivery_date_time": "2014-07-24 12:12:12", "vitamin_k": "yes", "hearing": "test passed","newborn_screening_test": "passed", "birth_outcome": "Liveborn"}}'
  -H "Content-Type: application/json" \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "baby": {
    "id": 1,
    "pregnancy_id": 1,
    "hospital_number": "H9999999",
    "gender": "male",
    "weight": 3720,
    "delivery_date_time": "2014-07-24 12:12:12",
    "vitamin_k": "yes",
    "hearing": "test passed",
    "newborn_screening_test": "passed",
    "birth_outcome": "Liveborn"
  }
}
```
-----------
## PUT /babies/:ID

#####Notes
Update a Baby record


####Input
####Output

####Example
```bash
$ curl -X PUT 54.72.7.91:8888/babies/1 \
  -d '{"baby": {"pregnancy_id":1, "hospital_number": "H9999999", "gender": "male", "weight": 3720, "delivery_date_time": "2014-07-24 12:12:12", "vitamin_k": "yes", "hearing": "test passed","newborn_screening_test": "passed", "birth_outcome": "Liveborn"}}'
  -H "Content-Type: application/json" \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "baby": {
    "id": 1,
    "pregnancy_id": 1,
    "hospital_number": "H9999999",
    "gender": "male",
    "weight": 3720,
    "delivery_date_time": "2014-07-24 12:12:12",
    "vitamin_k": "yes",
    "hearing": "test passed",
    "newborn_screening_test": "passed",
    "birth_outcome": "Liveborn"
  }
}
```
-----------

#Anti D Histories Resources

## GET /anti_dhistories?pregnancy_id=1

####Notes
* Get a list of all history for a pregnancy

####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/anti_dhistories?pregnancy_id=1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "anti_d_histories": [
    {
      "id": 1,
      "anti_d": "No",
      "created_at": "2015-06-15T14:59:09.463984+00:00",
      "pregnancy_id": 1
    },
    ...
  ]
}
```
----------

## GET /anti_dhistories/1

####Notes
* Get a list of all history for a particular id

####Input
####Output

####Example
```bash
$ curl -X GET 54.72.7.91:8888/anti_dhistories/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "anti_d_histories": [
    {
      "id": 1,
      "anti_d": "No",
      "created_at": "2015-06-15T14:59:09.463984+00:00",
      "pregnancy_id": 1
    },
    ...
  ]
}
```

# Pregnancy Note Resources

## GET /pregnancies/1/notes

####Notes

Return a list of notes for the pregnancy

####Example

```bash
$ curl -X GET http://localhost:5000/pregnancies/1/notes \
  -H "Api-Key: de0404688099d3088baa" \
  -H "Auth-Token: TEST"

{
    "notes": [
        {
            "created_at": "2015-06-16",
            "id": 2,
            "note": "test",
            "pregnancy_id": 1,
            "service_provider_id": 1
        },
        {
            "created_at": "2015-06-16",
            "id": 3,
            "note": "test",
            "pregnancy_id": 1,
            "service_provider_id": 1
        },
        {
            "created_at": "2015-06-16",
            "id": 4,
            "note": "test",
            "pregnancy_id": 1,
            "service_provider_id": 1
        }
    ]
}
```

## POST /pregnancies/1/notes

####Notes

Create a new note for the pregnancy

####Example

```bash
$ curl -X POST http://localhost:5000/pregnancies/1/notes \
  -H "Api-Key: de0404688099d3088baa" \
  -H "Auth-Token: TEST" \
  -H "Content-Type: application/json"
  -d '{"note":{"note": "test"}}' \

{
    "note": {
        "created_at": "2015-06-16",
        "id": 4,
        "note": "test",
        "pregnancy_id": 1,
        "service_provider_id": 1
    }
}
```

