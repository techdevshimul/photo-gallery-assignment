import React, { Component } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectedItemFunc } from '../../../Redux/actionCreators';
// import { itemsUrl } from '../../../Redux/dataBase';
import CommentForm from '../../Forms/CommentForm/CommentForm';
import dateFormat from "dateformat";
import Spinner from '../../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        comments: state.comments,
        token: state.token,
        commentSubmitLoading: state.commentSubmitLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedItemFunc: item => dispatch(selectedItemFunc(item)),
    }
};

class Item extends Component {

    state = {
        isModalOpen: false
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleButtonClick = () => {
        const { selectedItemFunc, item } = this.props;
        selectedItemFunc(item);
        this.setState({
            isModalOpen: true
        })
    };

    render() {

        const { item } = this.props;
        // let reverseComment = [...this.props.comments].reverse();
        // const comment = reverseComment.map(comment => {
        //     if (item.id == comment.itemId) {
        //         return (
        //             <div className='pe-2 ps-2 mt-2 mb-3'>
        //                 <div className='p-2 border w-100 h-100' style={{ borderRadius: "5px" }}>
        //                     <h6 style={{ fontSize: "18px" }}> {comment.userName}</h6>
        //                     <p>{comment.comment}</p>
        //                     <p>{dateFormat(comment.addTime, "dS mmmm yyyy, h:MM TT")}</p>
        //                 </div>
        //             </div>
        //         )
        //     }
        // })

        let loadComment = [];
        let reverseComment = [...this.props.comments].reverse();
        reverseComment.forEach(comment => {
            if (comment.itemId === item.id) {
                loadComment.push(
                    <div className='pe-2 ps-2 mt-2 mb-3'>
                        <div className='p-2 border w-100 h-100' style={{ borderRadius: "5px" }}>
                            <h6 style={{ fontSize: "18px" }}> {comment.userName}</h6>
                            <p>{comment.comment}</p>
                            <p>{dateFormat(comment.addTime, "dS mmmm yyyy, h:MM TT")}</p>
                        </div>
                    </div>
                );
            }
        });

        if (loadComment.length === 0) {
            loadComment = (
                <div><p style={{ fontWeight: "bold", padding: "5px" }}>Be The First One To Comment On This Photo.</p></div>
            )
        }

        let commentForm = null;
        if (this.props.token != null) {
            if (this.props.commentSubmitLoading) {
                commentForm = <Spinner />
            } else {
                commentForm = <CommentForm />;
            }

        } else {
            commentForm = (
                <div>
                    <Link to="/login">
                        <Button color="danger" className='m-2'>Login To Comment</Button>
                    </Link>
                </div>
            )
        }

        // let stock;

        // if (item.remainAmount === 0) {
        //     stock = (<div>
        //         <p style={{ fontWeight: "bold" }} className='text-danger'>Out Of Stock!</p>
        //     </div>);
        // } else if (item.remainAmount <= 5) {
        //     stock = (<div>
        //         <p style={{ fontWeight: "bold", color: "orangered" }}>Low On Stock! Only {item.remainAmount} Photos Left!</p>
        //     </div>);
        // }
        // else {
        //     stock = (
        //         (<div>
        //             <p style={{ fontWeight: "bold" }} className='text-success'>Stock Available!</p>
        //         </div>)
        //     );
        // }

        return (
            <div className='p-2'>
                <Card style={{ width: '18rem', border: "1px solid gray" }}>
                    <img alt="Sample" src={item.image} style={{ borderRadius: "5px 5px 0 0", aspectRatio: "16/9", objectFit: 'cover' }} />
                    <CardBody>
                        <CardTitle tag="h5">
                            {item.title}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Category : {item.categoryName}
                        </CardSubtitle>
                        {/* <CardText>
                            Details: {item.details}
                        </CardText> */}
                        {/* <CardText>
                            Price : {item.price} <span style={{ fontSize: "22px" }}>&#2547;</span>
                        </CardText>
                        {stock} */}
                        {/* <Link to={itemsUrl + "/" + item.id}> */}
                        <Button color="primary" style={{ width: "100%" }} onClick={this.handleButtonClick}>See Details</Button>
                        {/* </Link> */}
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.isModalOpen} fullscreen>
                    <ModalHeader toggle={this.closeModal}>Photo Title : {item.title}</ModalHeader>
                    <ModalBody>
                        <div className='d-flex flex-wrap justify-content-center'>
                            <div className='col-6 p-2' style={{ minWidth: "300px" }}>
                                <img className='img-fluid'
                                    alt="Item"
                                    src={item.image}
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                            <div className='col-6' style={{ minWidth: "300px" }}>
                                <div className='m-2 p-2' style={{ border: "1px solid gray", borderRadius: "5px" }}>
                                    <h5 style={{ fontWeight: 'bold' }}>Comments:</h5>

                                    {commentForm}
                                    {loadComment}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);