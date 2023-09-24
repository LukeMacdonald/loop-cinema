function ProfileHeader({ user, setModalShow }) {
    return (
      <div>
        <h1 className="username">{user.name}</h1> 
        <div className="row">
          <div className="col-6">
            <h4 style={{ marginTop: '5%' }}>About:</h4>
          </div>
          <div className="col-6" style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => setModalShow(true)}
              className="btn btn-outline-secondary"
              style={{ width: '40px', marginTop: '0.5rem', height: '40px' }}
            >
              <i className="fa fa-pen-to-square" style={{ fontSize: '0.9rem' }} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfileHeader;