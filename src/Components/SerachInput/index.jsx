  import { Component } from "react";
  import URL_API from '../url'

  class InputSearch extends Component{

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoaded: false,
            error: null,
            filteredUsers: [],
        }
    }

    componentDidMount() {
        fetch(URL_API).then(response => {
            return response.json();
        }).then(result => {
            this.setState({
                users: result,
                isLoaded: true
            });
        }).catch(err => {
            this.setState({
                error: err,
                isLoaded: true
            })
        });
    }

    draw = () => {
        const {state: {isLoaded, error, filteredUsers, users}}=this;
          let arr=filteredUsers.length?filteredUsers:users;

        if(error) {
            return <div>{error}</div>
        } else if(!isLoaded) {
            return <div>Loaded...</div>
        } else {
            return arr.map(item => {
                return (
                    <p key={item.id}>{item.name}</p>
                )
            })
        }
    }

    searchNames = (targetValue) => {
        const {state: {users}}=this;

        const newFilteredArr = users.filter(item => {
            return item.name.toLowerCase().includes(targetValue.toLowerCase());
        });

        this.setState({
            filteredUsers: newFilteredArr
        });
    }
     
    render(){
        return(
            <>
                <div>
                    <input onChange={(e) => this.searchNames(e.target.value)} type="text"  placeholder="SEARCH"/>
                </div>
                
                <div className="drop_down">
                    {this.draw()}
                </div>
            </>
                
        )
    }


  }

  export default InputSearch