#Overview

This page provides details on the data fields that help define the resources or objects that SMART is built to serve.

The names of the fields represent the corresponding columns in the database and are identical to the name of the fields in each API call.

While we will try to keep this up-to-date, discrepancies will inevitably kick in. We'd like to ask that if you find a discrepancy or inaccuracies, then please let us know at [The Product Works](http://www.theproduct.works/about-us/)

#Contents

- [Baby Fields](#baby-fields)

## Pregnancy Fields

Table "public.pregnancy"

         Column          |          Type          |                       Details
-------------------------|------------------------|--------------------------------------------------------
 estimated_delivery_date | date                   | YYYY-MM-DD
 additional_info         | character varying(500) | _TBC_
 birth_mode              | character varying(50)  | One or more of the following: Svd \| Ventose \| Forceps \| Failed Ventose \| Failed forceps \| LSCS \|
 perineum                | perineum_choice        | Single selection from following options: Intact \| 1 degree with sutures \| 1 degree without sutures \| 2 degree \| 3 degree \| 4 degree
 service_user_id         | integer                | Internal ID of the mother's record
 anti_d                  | character varying(50)  | _TBC_
 created_at              | date                   | not null
 last_menstrual_period   | date                   |
 feeding                 | feeding_types          | Single selection from: Breast \| bottle \| Mixed

 [Top of page ↑](#overview)
 
##Baby Fields

 Table "public.baby"
 
         Column         |            Type             | Details 
------------------------|-----------------------------|---------------------------------------------------
 hospital_number        | character varying(40)       | Standard format, i.e. "H3nnnnnnn", where n=[0-9]
 gender                 | character varying(10)       | Male \| Female
 weight                 | integer                     | Stored in grams; should be displayed as kilograms to 2 decimal places
 delivery_date_time     | timestamp without time zone | YYYY-MM-DD HH:MM:SS (e.g. 2014-09-09 13:45:00"
 vitamin_k              | character varying(20)       | _null_ \| Oral \| IM \| Declined \| N/A
 hearing                | character varying(30)       | _null_ \| Complete \| Appt Given \| Declined
 newborn_screening_test | character varying(15)       | _null_ \| Done \| Declined
 name                   | character varying(40)       | _null_ \| Conor!
 birth_outcome          | character varying(20)       | _null_ \| Liveborn \| Stillborn \| Neo-natal death \| Complete Miss \| Incomplete Miss \| Ectopic \| TOP

 [Top of page ↑](#overview)
