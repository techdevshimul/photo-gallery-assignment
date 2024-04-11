import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import Item from './Item/Item';
import { fetchItems } from '../../Redux/actionCreators';
import FetchErrors from '../ErrorHandling/FetchErrors';

const mapStateToProps = state => {
    return {
        items: state.items,
        comments: state.comments,
        categories: state.categories,
        itemErr: state.itemErr,
        itemLoading: state.itemLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: () => dispatch(fetchItems()),
    }
}

class Items extends Component {


    componentDidMount() {
        // this.props.fetchItems();
    }

    render() {

        document.title = "Photos - Photo Gallery App";

        let items = null;
        if (this.props.itemErr) {
            items = <FetchErrors errText="Sorry! Failed To Load Photos. Use Below Links To Browse Photos, Categories Or Reload/Refresh After Sometime!" />
        } else if (this.props.items.length === 0) {
            items = <FetchErrors errText="Sorry! Failed To Load Photos. Use Below Links To Browse Photos, Categories Or Reload/Refresh After Sometime!" />
        } else {
            items = this.props.items.map(item => {
                return <Item item={item} key={item.id} />;
            })
        }

        return (
            <div>
                <h4 style={{ textAlign: "center", margin: "5px" }}>All Photos :</h4>
                <div className="d-flex justify-content-center mr-auto flex-wrap" >
                    {this.props.itemLoading ? <Spinner /> : items}
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);