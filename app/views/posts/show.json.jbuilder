json.post do
  json.extract! @post,
    :id,
    :slug,
    :title

  json.user do
    json.extract! @post.user,
      :name
  end
end
