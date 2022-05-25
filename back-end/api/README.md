* register user:
    - {base_url}/api/user => POST
    - payload: {
        "email" : "",
        "loginname" : "",
        "username" : "",
        "address" : "",
        "citizen_identification" : ,
        "phone_number" : "",
        "gender" : true,
        "userpassword" : "",
        "acc_created" : "",
        "avatar" : "",
        "rate" : 
    }
* Update user
    - {base_url}/api/update-user => POST
    - payload: {
        email :,
        username : ,
        address : ,
        citizen_identification : ,
        phone_number : ,
        gender : ,
        avatar : ,
        rate : ,
    }
* Upload avatar
    - {base_url}/api/upload-avatar => POST
    - payload: form-data {
        image: {image}
    }
* Get user information
    - {base_url}/api/user => GET

* Login
    - {base_url}/api/login => POST
    - payload: {
        "loginname" : "",
        "userpassword" : ""
    }
* Get all products
    - {base_url}/api/products => GET

* Get new products
    - {base_url}/api/products-new => GET

* Get product image
    - {base_url}/api/products-img => POST
    - payload: {
        productID: ""
    }

* Search by keyword
    - {base_url}/api/search =>POST
    - payload: {
        keyword: ""
    }

* Get all product types
    - {base_url}/api/get-product-types => GET

* Create bill
    - {base_url}/api/bill => POST
    - payload: {
        "address_delivery" : "",
        "total": {{cai nay la tong tien},
        "products": [
            {
                "id": "2",
                "quanlity": 3
            },
            {
                "id": "3",
                "quanlity": 1
            }
        ] 
    }

* Update bill
    - {base_url}/api/update-bill => POST
    - payload: {
        "address_delivery" : "0",
        "total": 0,
        "id_bill": "88YN60FC",
        "bill_status" : 0,
        "products": [
            {
                "id": "2",
                "quanlity": 3
            },
            {
                "id": "3",
                "quanlity": 0
            }
        ] 
    }
* Get user total bill
    - {base_url}/api/total-bill => GET
* Get bill details
    - {base_url}/api/tdetail-bills => POST
    - payload: {
        "id_bill":""
    }

* Delete bill
    - {base_url}/api/delete-bill => POST
    - payload: {
        "id_bill": ""
    }
* Forget password:
    - {base_url}/api/forgot-password => POST
    - payload: {
        "email":""
    }

* Change password:
    - {base_url}/api/change-password => POST
    - payload: {
        "userpassword" : "",
        "newpassword" : ""
    }
    
* Add rate: 
    - {base_url}/api/add-rate => POST
    - payload: {
        "id_product" : "",
        "rate": "",
        "cmt" : ""
    }
* Get product rate:
    - {base_url}/api/product-rate => POST
    - payload: {
        "id_product": ""
    }
* Update rate
    -{base_url}/api/update-rate
    - payload: {
        "id_product": "88YN60FC",
        "rate": 4,
        "cmt": "2"
    }