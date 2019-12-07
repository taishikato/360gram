import React from 'react'
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

class EditModal extends React.Component<PropsInterface> {

  state = {
    title: '',
    description: '',
    isSubmitting: false
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({ title: e.target.value })
  }

  handleDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    this.setState({ description: e.currentTarget.value })
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const postId = this.props.postId
    const { title, description } = this.state

    this.setState({ isSubmitting: true })
    await db
      .collection('posts')
      .doc(postId)
      .update({
        title,
        description
      })
    this.setState({ isSubmitting: false })
    this.props.handleCloseModal()
    this.props.showSuccessSnackbar()
    this.props.setTitle(title)
    this.props.setDescription(description)
  }

  componentDidMount = () => {
    this.setState({
      title: this.props.title,
      description: this.props.description
    })
  }

  render() {
    const { title, description, isSubmitting } = this.state

    return (
      <div id="edit-modal" className="section">
        <form onSubmit={(event) => this.handleSubmit(event)} id="post-info" className="column whiteBg">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                required
                onChange={this.handleTitleChange}
                value={title}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea value={description} className="textarea" onChange={this.handleDescriptionChange}></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control submit-button">
              {isSubmitting && <button className="button is-success is-loading">Update</button> }
              {title === '' && !isSubmitting && <button className="button is-success has-text-weight-bold" disabled>Update</button> }
              {title !== '' && !isSubmitting && <input type="submit" className="button is-success has-text-weight-bold" value="Update" /> }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EditModal

interface PropsInterface {
  postId: string,
  title: string,
  description: string,
  handleCloseModal: () => void
  showSuccessSnackbar: () => void,
  setTitle: (title: string) => void,
  setDescription: (description: string) => void
}
