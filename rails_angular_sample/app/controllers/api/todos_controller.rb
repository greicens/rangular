class Api::TodosController < ApplicationController
  def index
    @todos = Todo.all.order("created_at DESC")
    render json: @todos
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render json: { errors: @todo.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :description, :done)
  end
end
