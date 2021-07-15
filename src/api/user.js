import Axios from 'axios'

class User {
    getAllUser(){
        return Axios.get('http://dummy.restapiexample.com/api/v1/employees')
    }
}

export default User