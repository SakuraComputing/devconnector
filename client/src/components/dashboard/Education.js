import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';


class Education extends React.Component {

    onDeleteClick = (id) => {
        this.props.deleteEducation(id);
    };

    render() {

        const education = this.props.education.map(exp => (
            <tr key={exp._id}>
                <td>{exp.school}</td>
                <td>{exp.degree}</td>
                <td>
                    <Moment format="DD-MMM-YYYY">{exp.from}</Moment> -
                    {(exp.to === null) ? (' Now') : <Moment format="DD-MMM-YYYY">{exp.to}</Moment>}
                </td>
                <td><button onClick={()=> {this.onDeleteClick(exp._id)}} className="btn btn-danger">Delete</button></td>
            </tr>
        ));
        return (
            <div className="">
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {education}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation: deleteEducation })(Education);
