import requests
import json
import test_barcode

def GetAPI(isbn):
    endpoint = "https://api.openbd.jp/v1/get"
    headers = {}
    params = {"isbn":isbn}
    result = requests.get(endpoint, headers = headers, params = params)
    result_json = result.json()
    return result_json # json file

#name: <string>
#category: <string>
#description: <string>
#transportation-method: <int>
def GetInfo(json_file):
    try:
        name = json_file[0]["onix"]["DescriptiveDetail"]["TitleDetail"]["TitleElement"]["TitleText"]["content"]
    except KeyError:
        name = " "
    
####################
    try:
        C_code = str(json_file[0]["onix"]["DescriptiveDetail"]["Subject"][0]["SubjectCode"])
    except KeyError:
        C_code = "####"
    C_dic = {0:"単行本",1:"文庫",2:"新書",3:"全集・双書",4:"ムック・その他",5:"事・辞典",6:"図鑑",7:"絵本",8:"磁性媒体など",9:"コミック"}
    if C_code[1] == "#":
        category = "本"
    else:
        for i in range(10):
            if int(C_code[1]) == i:
                category = C_dic[i]
############
    try:
        description = json_file[0]["onix"]["CollateralDetail"]["TextContent"][0]["Text"]
    except KeyError:
        description = " "
    try:
        page = json_file[0]["onix"]["DescriptiveDetail"]["Extent"][0]["ExtentValue"]
    except KeyError:
        page = 0

    # Unimplemented
    Trans_dic = {0:"らくらくメルカリ便",1:"ゆうゆうメルカリ便",2:"梱包・発送たのメル便",3:"ゆうメール",4:"ゆうメール",5:"事・辞典",6:"レターパック",7:"普通郵便(定形、定形外)",8:"クロネコヤマト",9:"ゆうパック",10:"クリックポスト",11:"ゆうパケット",12:"未定"}

    transportation_method = page

    result = {'name': name, 'category':category,'description': description,'transportation_method':transportation_method}
    return result


if __name__ == "__main__":
    #isbn = 9784492971376
    isbn = test_barcode.ReadBarcode()
    res = GetAPI(isbn)
    ans = GetInfo(res)
    print(ans)