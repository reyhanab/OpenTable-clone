
def convert_to_data_object():

	with open('/Users/reyhanehabdollahi/Documents/OpenTable-clone/backend/app/seeds/data.txt', 'r') as f:
		data = [x.replace('\n', '').split() for x in f.readlines()]
		current_resto = {}
		restaurants = []
		photo = False
		preview_image = 0
		for i, value in enumerate(data):
			if value[0] == '---restaurant---':
				if i != 0:
					restaurants.append(current_resto)
				current_resto = {
					'name' : '',
					'description' : '',
					'city' : '',
					'type' : '',
					'phone_number' : '',
					'address' : '',
					'rating' : '',
					'lat' : '',
					'lng' : '',
					'preview_image' : '',
					'photos' : []
				}
				photo = False
				preview_image = 0
			if value[0] == 'name:':
				current_resto['name'] = ' '.join(value[1:])
			# if value[0] == 'description:':
			# 	current_resto['description'] = ' '.join(value[1:])
			if value[0] == 'city:':
				current_resto['city'] = ' '.join(value[1:])
			if value[0] == 'type:':
				current_resto['type'] = ' '.join(value[1:])
			if value[0] == 'phone_number:':
				current_resto['phone_number'] = ' '.join(value[1:])
			if value[0] == 'address:':
				current_resto['address'] = ' '.join(value[1:])
			if value[0] == 'rating:':
				current_resto['rating'] = float(value[1])
			if value[0] == 'capacity:':
				current_resto['capacity'] = int(value[1])
			if value[0] == 'lat:':
				current_resto['lat'] = float(value[1])
			if value[0] == 'lng:':
				current_resto['lng'] = float(value[1])
			if photo:
				current_resto['photos'].append(value[0])
				if preview_image == 0:
					current_resto['preview_image'] = value[0]
					preview_image += 1
			if value[0] == 'photos:':
				photo = True

		restaurants.append(current_resto)
	return restaurants
	# 	print(current_resto)

def add_description_to_data_object(restaurants):
	with open('/Users/reyhanehabdollahi/Documents/OpenTable-clone/backend/app/seeds/descriptions.txt', 'r') as f:
		# data = [x.replace('\n', '').split('description:') for x in f.readlines()]

		# data = []
		current_description = ''
		i = 0
		for x in f.readlines():
			# new_x = x.replace('description: ', '')

			if 'description: ' in x and i != 0:
				# data.append([current_description])
				restaurants[i]['description'] = current_description
				current_description = ''
			if 'description: ' in x:
				current_description += x.replace('description: ', '')
				i+= 1
			if x.strip() == '+ Read more':
				# data.append([current_description])
				# # restaurants[i]['description'] = current_description
				# current_description = ''
				continue
			else: current_description += f'{x}'


	restaurants[len(restaurants)-2]['description'] = current_description
	return restaurants
	# print(len(restaurants))
	# print(len(data))


# print(data)

# print(restaurants)
