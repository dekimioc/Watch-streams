import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions/index'
import history from '../../history';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        const id = this.props.match.params.id;

        return (
            <div>
                <div onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</div>
                <Link to="/" className="ui button">Cancel</Link>
            </div>
        )
    }

    renderContent() {
        if(!this.props.stream) {
            return <div>Are you sure to you want to delete this stream?</div>
        }

        return `Are you sure to you want to delete the stream with a title: ${this.props.stream.title}`
    }

    render() {
        return (
            <div>
                <div>StreamDelete</div>
                <Modal 
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismis={() => history.push("/")}
                />
            </div>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);