import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    chechoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.chechoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
