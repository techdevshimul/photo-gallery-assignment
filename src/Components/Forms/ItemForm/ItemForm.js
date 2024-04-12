import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { baseUrl, categoriesUrl, extensionFormat, itemsUrl } from '../../../Redux/dataBase';

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        categories: state.categories,
        categoryLoading: state.categoryLoading
    }
}

class ItemForm extends Component {
    state = {
        values: {
            categoryName: "",
            title: "",
            image: "",
        }
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
    }

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        if (this.state.values.title !== "" && this.state.values.image !== "") {
            this.setState({
                isLoading: true
            })

            axios.post(baseUrl + itemsUrl + extensionFormat, this.state.values)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: "Photo Created Successfully!",
                            values: {
                                categoryName: "",
                                title: "",
                                image: "",
                            }
                        })
                    } else {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: "Something Went Wrong! Submit Again!"
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Submit Again!"
                    })
                });
        }
    }

    render() {
        let categoryOptions;

        if (this.props.categoryLoading === false) {
            categoryOptions = this.props.categories.map(category => {
                return (
                    <option key={category.id} value={category.title}>{category.title}</option>
                )
            })
        }

        let form = (
            <div className='textColor'>
                <h4 style={{ textAlign: "center", margin: "5px" }}>Create Photo As You Need :</h4>
                <div className='m-2 p-2 fgColor' style={{ minWidth: "350px", border: "1px solid gray" }}>
                    <form style={{ padding: "5px" }}>
                        <input name='title' className='form-control' value={this.state.values.title} placeholder='Title' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='image' className='form-control' value={this.state.values.image} placeholder='Image URL' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <select name="categoryName" className='form-control' value={this.state.values.categoryName} onChange={(e) => this.inputChangerHandler(e)} >
                            {categoryOptions}
                        </select>
                        <br />
                        <br />
                        <Button color='success' className='me-auto' onClick={this.submitHandler}>Submit Photo</Button>
                        <Link to="/">
                            <Button color='secondary' className='ms-1'>Cancel</Button>
                        </Link>
                    </form>
                </div>
            </div >
        )

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p style={{ textAlign: 'center' }}>{this.state.modalMsg}</p>
                        <div className='d-flex justify-content-center mr-auto flex-wrap'>
                            <Link to={itemsUrl}>
                                <Button color='secondary' className='m-1' >Photos</Button>
                            </Link>
                            <Link to={categoriesUrl}>
                                <Button color='secondary' className='m-1' >Categories</Button>
                            </Link>
                            <Button color='secondary' className='m-1' onClick={this.closeModal}>Close</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ItemForm);