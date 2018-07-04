//var CommentBox = React.createClass({
//  render: function() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList />
//        <CommentForm />
//      </div>
//    );
//  }
//});

//var CommentList = React.createClass({
//  render: function() {
//    return (
//      <div className="commentList">
//        <Comment author="pete hunt">this is one comment</Comment>
//        <Comment author="jordan walker">this is *another* comment</Comment>
//      </div>
//    );
//  }
//})

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
})

// --------Using props

//var Comment = React.createClass({
//  render: function() {
//    return (
//      <div className="comment">
//        <h2 className="commentAuthor">
//          {this.props.author}
//        </h2>
//        {this.props.children}
//      </div>
//    );
//  }
//});

// --------Adding Markdown

var Comment = React.createClass({
  render: function() {
  var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

// -------Hook up the data model

// propsの値は必ず親コンポーネントから渡される
//var CommentBox = React.createClass({
//  render: function() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList data={this.props.data}/>
//        <CommentForm />
//      </div>
//    );
//  }
//});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

// ---------Fetchinig from the server

// stateはgetInitialState()が初期値で必要
// 親Commentの値が変更するの場合に必要
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
