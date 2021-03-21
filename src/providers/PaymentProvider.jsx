import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import LocalCurrency from '../utils/LocalCurrency';
import PaymentContext from '../contexts/PaymentContext';
import React from 'react';
import { ethers } from 'ethers';

class PaymentProvider extends React.Component {
  state = {}

  paymentInETH() {
    if(this.props.route.amounts.length <= 2) {
      if(this.props.route.token.symbol === 'ETH') {
        return ethers.utils.formatEther(this.props.route.amounts[0]);
      } else {
        return ethers.utils.formatEther(this.props.route.amounts[1]);
      }
    } else {
      return ethers.utils.formatEther(this.props.route.amounts[1]);
    }
  }

  local() {
    return LocalCurrency(this.paymentInETH() * this.props.price);
  }

  token() {
    if(this.props.route.nft) {
      return DisplayTokenAmount(this.props.route.amounts[1], this.props.route.token.decimals, 'WETH');
    } else {
      return DisplayTokenAmount(this.props.route.amounts[0], this.props.route.token.decimals, this.props.route.token.symbol);
    }
  }

  feeInETH() {
    if(this.props.gas == undefined) { return }
    return parseFloat(ethers.utils.formatUnits(this.props.gas, 'gwei')) * this.props.route.fee;
  }

  feeLocal() {
    return LocalCurrency(this.feeInETH() * this.props.price);
  }

  feeToken() {
    return DisplayTokenAmount(this.feeInETH(), 0, 'ETH')
  }

  total() {
    return LocalCurrency((parseFloat(this.paymentInETH())) * this.props.price);
  }

  render() {
    if(!this.props.route) { return(<div>{this.props.children}</div>) }
    return(
      <PaymentContext.Provider value={{
        local: this.local(),
        token: this.token(),
        feeInETH: this.feeInETH(),
        feeLocal: this.feeLocal(),
        feeToken: this.feeToken(),
        total: this.total()
      }}>
        {this.props.children}
      </PaymentContext.Provider>
    )
  }
}

export default PaymentProvider;
