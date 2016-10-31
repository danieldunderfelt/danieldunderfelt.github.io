import CodeView from './CodeView'

class Blog {

  initialize() {
    if( ddblog.codeView ) {
      var codeView = new CodeView()
      codeView.initialize()
    }
  }
}

export default new Blog()
