import React, {useEffect, useState} from 'react';

interface ItemDetail {
    id: number;
    name: string;
    category: string;
    image_filename: string;
    description: string;

};

const server = process.env.API_URL || 'http://127.0.0.1:9000';
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';
console.log(placeholderImage)

interface Prop {
    reload?: boolean;
    onLoadCompleted?: () => void;
    item: ItemDetail;
    onValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}


export const ItemDetail: React.FC<Prop> = (props) => {
    const {reload = true, onLoadCompleted, item, onValueChange} = props;
    
  return (
        <div className="wrapper">
                <div key={item.id} className='ItemList'>
                    {/* <img src={item.image_filename || placeholderImage} width="250" /> */}
                    <p>
                    <div className="item-shoshai">
                        <p className="explanation-node">商品の詳細</p>
                        <div className="category-wrapper">
                        <span>カテゴリー<br /></span>
                        <input type="text" className="input-node" name="category" value={item.category} placeholder="入力してください" onChange={onValueChange} required/>
                        </div>
                        <br />
                        <div className="item-condition-wrapper">
                            <span>商品の状態<br />
                                <select className="input-node" name="itemCondition" onChange={onValueChange} required>
                                    <option selected value="" >選択してください</option>
                                    <option value="1">新品、未使用</option>
                                    <option value="2">未使用に近い</option>
                                    <option value="3">目立った傷や汚れなし</option>
                                    <option value="4">やや傷や汚れあり</option>
                                    <option value="5">傷や汚れあり</option>
                                    <option value="6">全体的に状態が悪い</option>
                                </select>
                            </span>
                        </div>
                    </div>

                    <br />

                    <div className="item-explanation-wrapper">
                        <p className="explanation-node">商品名と説明</p>
                        <div className="item-name">
                            <span>商品名<br />
                            <input type="text" className="input-node" name="name" value={item.name} onChange={onValueChange} /></span>
                        </div>
                        <br />
                        <div className="item-description">
                            <span >説明<br />
                            <textarea className="input-node" name="description" placeholder="色、素材、重さ、定価、注意点など" value={item.description} style={{height: '10vh'}} onChange={onValueChange}></textarea>
                            </span>
                        </div>
                    </div>

                    <br />

                    <div className="transportaion-detail">
                        <p className="explanation-node">配送について</p>
                        <div className="payment-which">
                            <span>配送料の負担<br />
                            <div className="container">
                                <select className="input-node" name="payment-which-pulldown" onChange={onValueChange} required>
                                    <option className="sentaku" value="1" selected >送料込み（出品者負担）</option>
                                    <option value="2">着払い（購入者負担）</option>
                                </select>
                            </div>
                            </span>
                        </div>
                        <br />
                        <div className='transoportation-how'>
                            <span>配送の方法<br />
                            
                                <select className="input-node" name="itemTransportationHow" required>
                                    <option selected value="">選択してください</option>
                                    <option value="1">らくらくメルカリ便</option>
                                    <option value="2">ゆうゆうメルカリ便</option>
                                    <option value="3">梱包・発送たのメル便</option>
                                    <option value="4">ゆうメール</option>
                                    <option value="5">レターパック</option>
                                    <option value="6">普通郵便(定形、定形外)</option>
                                    <option value="7">クロネコヤマト</option>
                                    <option value="8">ゆうパック</option>
                                    <option value="9">クリックポスト</option>
                                    <option value="10">ゆうパケット</option>
                                    <option value="11">未定</option>
                                </select>
                            </span>
                        </div>
                    </div>
                    </p>
                </div>
            
        </div>
  
  )
}

export default ItemDetail