class Api::V1::CommentsController < ApplicationController
  def index
    @data = [
      { author: "pete hunt", text: "this is one comment"},
      { author: "jordan walke", text: "this is *another* comment"}
    ]
  end
end
