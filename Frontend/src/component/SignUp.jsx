function Login() {
    
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-50">
                <h2>Sign Up</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input 
                            placeholder="Enter Name"
                            type="text"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0" 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            placeholder="Enter Email"
                            type="email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0" 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            placeholder="Enter Password"
                            type="password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0" 
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0 ">
                        Register
                    </button>
                </form>

                <p>Already have an account?</p>
                <button type="submit" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </button>
                
            </div>        
        </div>
    )
}

export default Login