import transformData as tf
class Product:
    def __init__(self, id, name, price, sellPrice, brand, category, sales, netWeight, unit, thumbUrl, imageUrl):
        self.id = id
        self.name = name
        self.price = price
        self.sellPrice = sellPrice
        self.brand = brand
        self.category = category
        self.sales = sales
        self.netWeight = netWeight
        self.unit = unit
        self.thumbUrl = thumbUrl
        self.imageUrl = imageUrl


keys = list(tf.data.keys())
productJson = []
for val in range(len(tf.data['id'])):
    product = Product(tf.data['id'][val], tf.data['name'][val], tf.data['price'][val], tf.data['sellPrice'][val], tf.data['brand'][val], tf.data['category'][val], tf.data['sales'][val], tf.data['netWeight'][val], tf.data['unit'][val], tf.data['thumbUrl'][val], tf.data['imageUrl'][val])
    productJson.append(product)

