import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label for="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label for="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="container my-3">
        <h2>Your notes</h2>
      </div>
    </div>
  )
}

export default Home
