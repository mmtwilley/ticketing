import Link from 'next/link'

const Headers = ({currentUser}) => {
    const links = [
        !currentUser && {label:'Sign Up', href:'/auth/signup'},
        !currentUser && {label:'Sign In', href:'/auth/signin'},
        currentUser && {label:'Sign Out', href:'/auth/signout'}
    ] . filter(linkConfig => linkConfig)
      .map(({label, href})=> {
        return(
          <li key={href} className='nav-item'> 
            <Link className="nav-link" href={href} legacyBehavior>
              {label}
            </Link>
         </li>
        )
      });



    return <nav className="navbar navbar-light bg-light">
        <Link legacyBehavior href="/">
            <a className='navbar-brand'>GitTix</a>
        </Link>

        <div className="d-flex justify-content-end">
            <ul className='nav d-flex align-items-center'>
                {links}
            </ul>
        </div>
    </nav>
}

export default Headers;