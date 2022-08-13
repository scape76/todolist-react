import React, {Component} from "react"

const WithGateway = (WrappedComponent, baseURL) => {
  const WithGateway =  class extends Component {

    fetchData = () => {
      return fetch(baseURL)
        .then(response => response.json())
    }
    
    createData = (data) => {
      return fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;utc-8'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if(!response.ok) {
          throw new Error('Failed to post')
        }
      })
    }
    
    updateData = (id, data) => {
      return fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;utc-8'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if(!response.ok) {
          throw new Error('failed to put')
        }
      })
    }
    
    deleteData = (id) => {
      return fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
      }).then(response => {
        if(!response.ok) {
          throw new Error('Failed to delete')
        } 
      })
    }
    render() {
      return <WrappedComponent fetchData={this.fetchData}
      createData={this.createData}
      updateData={this.updateData}
      deleteData={this.deleteData}/>
    }
  }

  WithGateway.displayName = `WithGateway(${WrappedComponent.displayName 
  || WrappedComponent.name
  || 'WrappedComponent'})`;
  
  return WithGateway;
}

export default WithGateway;