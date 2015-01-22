- [/login](##POST /login)
- [/logout](##POST /logout)

#Authentication

All requests to the SMART API must be within the bounds of an authenticated user session. The Client must make the necessary request for a secret token; this must then be sent in every subsequent API requests as a header, ``Auth-Token````.

In order to create and destroy a session, the following calls are supported:

  1. `login`: returns a unique ``Auth-Token`; this must be use in all subsequent API requests to the server.
  2. `logout`: destroys the user session and effectively disables the Auth-Token from further use.

**NOTE** 

If the ```Auth-Token``` becomes invalid or expired for any reason, such as a ```service_provider``` becoming inactive, then the API will return a 401 response to any authenticated request. At that point any client should destroy any stored data on the device and show the login screen.

##POST /login

* Allows that a SMART client to login to SMART backend with username and password. 
* Returns the ID of the client user and a unique auth token to be used in all subsequent API calls.

Example:

```bash
  $ curl -X POST http://54.72.7.91:8888/login \
    -d '{"login":{"username":"mate","password":"secret"}}' \
    -H "Content-Type: application/json"

  {
    "login": {
      "token": "S3cr3t",
      "id": 1
    }
  }
```

##POST /logout

Logout from the SMART application.

Example:

```bash
  $ curl -X POST http://54.72.7.91:8888/logout \
    -H "Auth-Token: S3cr3t"

  {
    "login": {
      "token": null
    }
  }
```
# Authorization
=============

The API requires that all clients send an Api-Key on all requests. You can request one or use a test key in a local installation of this API by inserting into the ```api_key``` table.

In the header of each request send ```Api-Key``` and the value equal to the key.




Reset Password Resource
=====================

## POST /reset_passwords

Request reset password email and token for a service provider

Example:
```
$ curl -X POST 0.0.0.0:5000/reset_passwords \
  -d "{"email":"sp@sp.com","username":"sp"}" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "reset_password": {
    "id": 1,
    "service_user_id": 1
  }
}
```

## PUT /reset_passwords/:TOKEN

Reset password for a service provider

Example:
```
$ curl -X PUT 0.0.0.0:5000/reset_passwords/S3cr3tT0k3n \
  -d "{"password":"newPwd1234","password_verification":"newPwd1234"}" \
  -H "Api-Key: 3g3tyh43gswe"

{
  "reset_password": {
    "id": 1,
    "service_user_id": 1
  }
}
```

Appointments Resource
=====================

Deals with everything that has to do with appointments, complete CRUD interface.

## GET /appointments

List all appointments. Can be filtered using query string params on date and clinic_id(s).

Example:
```
$ curl -X GET 0.0.0.0:5000/appointments -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "appointments": [
        {
            "id": "1",
            "date": "2014-12-12",
            "time": "12:12:00",
            "service_provider_id": "1",
            "service_user_id": "1",
            "priority": "other",
            "visit_type": "post-natal",
            "service_option_ids": []
        },
        { ... }
    ]
}
```

## POST /appointments

Create a new appointment with date, time, priority, visit_type, clinic_id and service_user_id

Example:
```
$ curl -X POST 0.0.0.0:5000/appointments \
  -d '{"date":"2014-12-12","time":"13:00:00","priority":"other","visit_type":"post-natal","service_provider_id":1,"service_user_id":1,"clinic_id":1}'\
  -H "Auth-Token: S3cr3t" \
  -H "Content-Type: application/json" \
  -H "Api-Key: 3g3tyh43gswe" \
  -b /tmp/cookies.txt

{
    "appointments": {
        "date": "2014-12-12",
        "id": "1",
        "service_provider_id": "1",
        "service_user_id": "1",
        "priority": "other",
        "time": "13:00:00",
        "visit_type": "post-natal",
        "clinic_id": 1
    }
}
```

## GET /appointments/:APPOINTMENT_ID

Show details of appointment looked up by `Appointment ID`

Example:
```
$ curl -X GET 0.0.0.0:5000/appointments/1  -d '{}' \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "appointments": {
        "date": "2014-12-12",
        "id": "1",
        "service_provider_id": "1",
        "service_user_id": "1",
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

## PUT /appointments/:APPOINTMENT_ID

Update details of appointment looked up by `ID`

Example:
```
$ curl -X PUT 0.0.0.0:5000/appointments/1 \
  -d '{"date":"2014-12-12","time":"13:00:00","service_provider_id":1}'\
  -H "Content-Type: application/json"\
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe" \
  -b /tmp/cookies.txt

{
    "appointments": {
        "date": "2014-12-20",
        "id": "1",
        "service_provider_id": "2",
        "service_user_id": "1",
        "priority": "other",
        "time": "13:00:00",
        "visit_type": "post-natal"
    }
}
```

## DELETE /appointments/:APPOINTMENT_ID

Delete appointment looked up by `ID` if no notes have been taken related to it.

Example:
```
$ curl -X DELETE 0.0.0.0:5000/appointments/1 \
  -H "Auth-Token: S3cr3t" \
  -H "Api-Key: 3g3tyh43gswe"

{
    "appointments": {
        "date": "2014-12-20",
        "id": "1",
        "service_provider_id": "2",
        "service_user_id": "1",
        "priority": "other",
        "time": "13:00:00",
        "visit_type": "post-natal"
    }
}
```

ServiceOptions Resource
=============

ServiceOptions to be applied to Clinics and Appointments. ServiceOptions are the terminology we came up with to create a loose relationship between the entities listed above. Creating service options are locked down Admin users only.

## GET /service_options

Get all the service_options that are in the system

Example:
```bash
$ curl -X GET 0.0.0.0:5000/service_options  -d '{}' \
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

## GET /service_options/:ID

Get a specific service_option

Example:
```bash
$ curl -X GET 0.0.0.0:5000/service_options/1  -d '{}' \
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

Appointment ServiceOptions Resource
=========================

Nested endpoint to list, apply or remove service options from Appointments.

## GET /appointments/:ID/service_options

Return all service_options associated with the appointment
```bash
$ curl -X get 0.0.0.0:5000/appointments/1/service_options  -d '{}' \
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

## POST /appointments/:ID/service_options

Add new service_option to the appointment

```bash
$ curl -X POST 0.0.0.0:5000/appointments/1/service_options \
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

## DELETE /appointments/:ID/service_options/:ID

Remove service_option from appointment


```bash
$ curl -X DELETE 0.0.0.0:5000/appointments/1/service_options/1 \
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

Clinic Resource
===============

CRUD API to deal with Clinics.

## GET /clinics

Get all the clinics that are in the system

Example:
```bash
$ curl -X GET 0.0.0.0:5000/clinics  -d '{}' \
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

### Query string params

#### service_option_id

Filter clinics results based on service_option_id

## GET /clinics/:ID

Get a specific clinic

Example:
```bash
$ curl -X GET 0.0.0.0:5000/clinics/1  -d '{}' \
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

## PUT /clinics/:ID

Update a specific clinic

Example:
```bash
$ curl -X GET 0.0.0.0:5000/clinics/1 \
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

## DELETE /clinics/:ID

Delete a specific clinic

Example:
```bash
$ curl -X GET 0.0.0.0:5000/clinics/1 \
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

## POST /clinics

Create new clinic

Example:
```bash
$ curl -X POST 0.0.0.0:5000/clinics \
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
Clinic Announcements Resource
=============================

These announcements/notes are in place to notify the midwives on rota in case there's a shortage of X in the clinics, or for some reason only take emergency bookings for a specific day for a clinic.

## GET /clinics/:ID/announcements

Get all announcements for a clinic

Example:
```bash
$ curl -X GET 0.0.0.0:5000/clinics/1/announcements  -d '{}' \
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

## GET /clinics/:ID/announcements/:ID

Get specific announcements for a clinic

Example:
```bash
$ curl -X GET 0.0.0.0:5000/clinics/1/announcements/2  -d '{}' \
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

## POST /clinics/:ID/announcements

Create announcements for a clinic

Example:
```bash
$ curl -X POST 0.0.0.0:5000/clinics/1/announcements \
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

## DELETE /clinics/:ID/announcements/:ID

Delete specific announcements for a clinic

Example:
```bash
$ curl -X DELETE 0.0.0.0:5000/clinics/1/announcements/2 \
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


Service Users Resource
======================

## GET /service_users

List all service_users
Example:
```
$ curl -X GET 0.0.0.0:5000/service_users  -d '{}' \
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
}
```

### Query string params

#### name

Partial case insensitive search for Service User name.

#### dob

Exact match lookup for Service User date of birth.

#### hospital_number

Hospital number lookup.

## GET /service_users/:ID

Show details of service_user looked up by `ID`
Example:
```
$ curl -X GET 0.0.0.0:5000/service_users/1  -d '{}' \
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
}
```

## POST /service_users

Create a new Service User
Example:
```
$ curl -X POST 0.0.0.0:5000/service_users \
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

## PUT /service_users/:ID

Update details of Service User looked up by `ID`
Example:
```
$ curl -X PUT 0.0.0.0:5000/service_users/1 \
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

Service Providers Resource
======================

CRUD interface for Service Providers. The API is locked down for Admin users only.

## GET /service_providers

List all service_providers
Example:
```
$ curl -X GET 0.0.0.0:5000/service_providers  -d '{}' \
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

Show details of service_providers looked up by `ID`
Example:
```
$ curl -X GET 0.0.0.0:5000/service_providers/1  -d '{}' \
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

## POST /service_providers

Create a new Service Provider
Example:
```
$ curl -X POST 0.0.0.0:5000/service_providers \
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

## PUT /service_providers/:ID

Update details of service_providers looked up by `ID`
Example:
```
$ curl -X PUT 0.0.0.0:5000/service_providers/1 \
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

Pregnancies Resource
====================

Create, Query and Update Pregnancy data

## GET /pregnancies

List all pregnancies
Example:
```bash
$ curl -X GET 0.0.0.0:5000/pregnancies  -d '{}' \
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

## GET /pregnancies/:ID

Get data for a specific pregnancy
Example:
```bash
$ curl -X GET 0.0.0.0:5000/pregnancies/1  -d '{}' \
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

## POST /pregnancies

Create a new pregnancy
Example:
```bash
$ curl -X POST 0.0.0.0:5000/pregnancies \
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

## PUT /pregnancies/:ID

Update pregnancy
Example:
```bash
$ curl -X PUT 0.0.0.0:5000/pregnancies \
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

Babies Resources
================

## GET /babies

Get list of babies in the system
Example:
```bash
$ curl -X GET 0.0.0.0:5000/babies  -d '{}' \
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

## GET /babies:ID

Get a specific Baby Data
Example:
```bash
$ curl -X GET 0.0.0.0:5000/babies/1  -d '{}' \
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

## POST /babies

Create a new Baby record
Example:
```bash
$ curl -X POST 0.0.0.0:5000/babies \
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

## PUT /babies/:ID

Update a Baby record
Example:
```bash
$ curl -X PUT 0.0.0.0:5000/babies/1 \
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
