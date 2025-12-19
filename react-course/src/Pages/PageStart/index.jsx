import Menu from '../../Components/Menu'
function PageStart({ children }) {

    return (
        <div className="min-h-screen bg-gray-50">
            <Menu />
            <main className="ml-0 md:ml-60 pt-20 px-4 md:px-8 pb-16 transition-all duration-300">
                {children}
            </main>
        </div>
    )
}

export default PageStart