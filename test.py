import spacy
 
nlp = spacy.load("fr_core_news_sm")
doc = nlp(u"Je fais ce code en buvant le café qui a été préparé par Gerard Mensoif")
for token in doc:
    if token.pos_ == u'VERB' :
        print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
            token.shape_, token.is_alpha, token.is_stop)