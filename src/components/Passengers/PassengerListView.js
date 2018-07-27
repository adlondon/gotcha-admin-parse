import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { X } from 'react-feather';

import { ModalCard, LoaderOrThis } from '../common';
import { getPassengers, deletePassenger, addPassenger } from './PassengerActions';
import DeletePassengerModal from './DeletePassengerModal';

class PassengerListView extends Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteModal: false };
    this.props.getPassengers(props.passengerList.length === 0);
    this.handleDeletePassenger = this.handleDeletePassenger.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  closeModals() {
    this.setState({ showDeleteModal: false });
  }

  handleDeletePassenger(passengerId) {
    this.setState({ showDeleteModal: false });
    if (passengerId) this.props.deletePassenger(passengerId);
  }

  render() {
    const columns = [
      { Header: 'Name', accessor: 'attributes.name' },
      { Header: 'Domains', accessor: 'attributes.servicePassenger.domains' },
      { Header: 'Radius', accessor: 'attributes.servicePassenger.radius' },
      { Header: 'Address', accessor: 'attributes.servicePassenger.formattedAddress' },
      {
        Header: '',
        accessor: 'id',
        Cell: () => <X style={{ cursor: 'pointer' }} color="red" size={30} />,
        width: 40
      }
    ];

    return (
      <LoaderOrThis loading={this.props.loading}>
        <div>
          <ReactTable
            getTdProps={(tableState, rowInfo, column) => ({ onClick: () => { if (column.Header === '') this.setState({ selectedPassenger: rowInfo.original, showDeleteModal: true }); } })}
            className="-striped -highlight mb4"
            data={this.props.passengerList}
            pageSize={10}
            showPageSizeOptions={false}
            columns={columns} />
          <div className="flex justify-between items-center">
            <div />
            {this.props.error && <div className="red">{this.props.error}</div>}
          </div>
          {this.state.showDeleteModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <DeletePassengerModal onClick={d => this.handleDeletePassenger(d)} passenger={this.state.selectedPassenger} />
            </ModalCard>
          }
        </div>
      </LoaderOrThis>
    );
  }
}


const mapStateToProps = ({ PassengerReducer }) => {
  const { passengerList, loading, error } = PassengerReducer;
  return {
    passengerList,
    loading,
    error
  };
};


export default connect(mapStateToProps, { getPassengers, deletePassenger, addPassenger })(PassengerListView);
