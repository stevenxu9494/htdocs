import re

# 开文件
with open('data/6.24/Response.txt', encoding='utf-16',mode='r', errors='ignore') as f:
  lines = [x.strip() for x in f.readlines()]

# 正则匹配
id = []
idPattern = re.compile(r'"id":\"(.*?)\"')

name = []
namePattern = re.compile(r'"name":\"(.*?)\"')

sellPrice = []
price = []
pricePattern = re.compile(r'"price":\"(.*?)\"')

brand = []
brandPattern = re.compile(r'"brand":\"(.*?)\"')

category = []
categoryPattern = re.compile(r'"catid":\"(.*?)\"')

sales = []
salesPattern = re.compile(r'"sales":(.*?),')

netWeight = []
netWeightPattern = re.compile(r'"netweight":\"(.*?)\"')

unit = []
unitPattern = re.compile(r'"specification":\"(.*?)\"')

thumbUrl = []
thumbUrlPattern = re.compile(r'"thumb_url":\"(.*?)\"')

imageUrl = []
imageUrlPattern = re.compile(r'"image_url":\"(.*?)\"')

# withShipRmbPrice = []
# withShipRmbPricePattern = re.compile(r'"with_ship_rmb_price":(.*?)}')

# Today's currency rate
currencyRate = 5
mixedShippingFee = 7.5
formulaShippingFee = 5.0
currentIndex = 0
for line in lines:
    # current line index
    currentIndex +=1
    if line == "Response code: 200":
        successResponseBody = lines[currentIndex]
        hasId = bool(re.search(r'"id"', successResponseBody))
        hasName = bool(re.search(r'"name"', successResponseBody))
        hasPrice = bool(re.search(r'"price"', successResponseBody))
        hasBrand = bool(re.search(r'"brand"', successResponseBody))
        hasCategory = bool(re.search(r'"catid"', successResponseBody))
        hasSales = bool(re.search(r'"sales"', successResponseBody))
        hasNetWeight = bool(re.search(r'"netweight"', successResponseBody))
        hasUnit = bool(re.search(r'"specification"', successResponseBody))
        hasThumbUrl = bool(re.search(r'"thumb_url"', successResponseBody))
        hasImageUrl = bool(re.search(r'"image_url"', successResponseBody))
        # hasWithShipRmbPricePattern = bool(re.search(r'"with_ship_rmb_price":(.*?)}', successResponseBody))
        # if hasId & hasName & hasWithShipRmbPricePattern:
        if hasId & hasName & hasPrice & hasBrand & hasCategory & hasSales & hasNetWeight & \
                hasUnit & hasThumbUrl & hasImageUrl:
            # append id
            idMatches = idPattern.finditer(successResponseBody)
            for idMatch in idMatches:
                id.append(successResponseBody[idMatch.span()[0]+6:idMatch.span()[1]-1])

            # append name
            nameMatches = namePattern.finditer(successResponseBody)
            for nameMatch in nameMatches:
                name.append(successResponseBody[nameMatch.span()[0]+8:nameMatch.span()[1]-1])

            # append brand
            brandMatches = brandPattern.finditer(successResponseBody)
            for brandMatch in brandMatches:
                brand.append(successResponseBody[brandMatch.span()[0] + 9:brandMatch.span()[1] - 1])

            # append category
            categoryMatches = categoryPattern.finditer(successResponseBody)
            for categoryMatch in categoryMatches:
                if successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '1':
                    category.append('奶粉')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '5':
                    category.append('保健产品')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '6':
                    category.append('个人护理')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '7':
                    category.append('美妆护肤')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '8':
                    category.append('母婴产品')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '9':
                    category.append('健康食品')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '10':
                    category.append('羊毛制品')
                elif successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1] == '3':
                    category.append('被子')
                # else:
                #     category.append(successResponseBody[categoryMatch.span()[0] + 9:categoryMatch.span()[1] - 1])

            # append sales
            salesMatches = salesPattern.finditer(successResponseBody)
            for salesMatch in salesMatches:
                sales.append(successResponseBody[salesMatch.span()[0] + 8:salesMatch.span()[1] - 1])

            # append netWeight
            netWeightMatches = netWeightPattern.finditer(successResponseBody)
            for netWeightMatch in netWeightMatches:
                netWeight.append(successResponseBody[netWeightMatch.span()[0] + 13:netWeightMatch.span()[1] - 1])

            # append unit
            unitMatches = unitPattern.finditer(successResponseBody)
            for unitMatch in unitMatches:
                unit.append(successResponseBody[unitMatch.span()[0] + 17:unitMatch.span()[1] - 1])

            # append thumb url
            thumbUrlMatches = thumbUrlPattern.finditer(successResponseBody)
            for thumbUrlMatch in thumbUrlMatches:
                thumbUrl.append(successResponseBody[thumbUrlMatch.span()[0] + 13:thumbUrlMatch.span()[1] - 1])

            # append image url
            imageUrlMatches = imageUrlPattern.finditer(successResponseBody)
            for imageUrlMatch in imageUrlMatches:
                imageUrl.append(successResponseBody[imageUrlMatch.span()[0] + 13:imageUrlMatch.span()[1] - 1])

            # append price
            priceMatches = pricePattern.finditer(successResponseBody)
            for priceMatch in priceMatches:
                price.append(successResponseBody[priceMatch.span()[0] + 9:priceMatch.span()[1] - 1])
                # if successResponseBody[priceMatch.span()[0] + 9:priceMatch.span()[1] - 1] != '0.00':
                sellPrice.append(str(round(float(successResponseBody[priceMatch.span()[0] + 9:priceMatch.span()[1] - 1]) * currencyRate * 1.3, 2)))
                # else:
                #     sellPrice.append('价格波动，请微信咨询')


            # append with ship rmb price
            # withShipRmbPriceMatches = withShipRmbPricePattern.finditer(successResponseBody)
            # for withShipRmbPriceMatch in withShipRmbPriceMatches:
            #     withShipRmbPrice.append(successResponseBody[withShipRmbPriceMatch.span()[0]+22: withShipRmbPriceMatch.span()[1]-1])


# initialize data structure
data = {}
for i in range(len(id)):
    data['id'] = id
    data['name'] = name
    data['price'] = price
    data['sellPrice'] = sellPrice
    data['brand'] = brand
    data['category'] = category
    data['sales'] = sales
    data['netWeight'] = netWeight
    data['unit'] = unit
    data['thumbUrl'] = thumbUrl
    data['imageUrl'] = imageUrl
    # data['withShipRmbPrice'] = withShipRmbPrice

for j in range(len(id)):
    print(data['sellPrice'][j])
    print("--------------------")

    if data['category'][j] != '奶粉':
        data['sellPrice'][j] = str(round(float(data['sellPrice'][j]) + ((float(data['netWeight'][j]) / 1000) * mixedShippingFee) * currencyRate, 2))
    else:
        data['sellPrice'][j] = str(round(float(data['sellPrice'][j]) + ((float(data['netWeight'][j]) / 1000) * formulaShippingFee) * currencyRate, 2))
    print(data['sellPrice'][j])
# print(data)
# print("########################################")
# print("id's length: " + str(len(id)))
# print("########################################")
# print("name's length: " + str(len(name)))
# print("########################################")
# print("price's length: " + str(len(price)))
# print("########################################")
# print("sellPrice's length: " + str(len(sellPrice)))
# print("########################################")
# print("brand's length: " + str(len(brand)))
# print("########################################")
# print("category's length: " + str(len(category)))
# print("########################################")
# print("sales's length: " + str(len(sales)))
# print("########################################")
# print("netWeight's length: " + str(len(netWeight)))
# print("########################################")
# print("unit's length: " + str(len(unit)))
# print("########################################")
# print("thumbUrl's length: " + str(len(thumbUrl)))
# print("########################################")
# print("imageUrl's length: " + str(len(imageUrl)))
# print("########################################")
# print("withShipRmbPrice's length: " + str(len(withShipRmbPrice)))