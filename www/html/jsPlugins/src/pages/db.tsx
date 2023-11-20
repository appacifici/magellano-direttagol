import React, { useEffect }     from 'react';
import { 
    Provider,
    TypedUseSelectorHook, 
    useSelector, 
    useDispatch }               from 'react-redux';
    
import Header                   from '../container/Header';
import Footer                   from '../container/Footer';
import Main                     from '../container/Main';
import MatchesBoard             from '../match/components/MatchesBoard';
import { setMatches,
         updateMatches } 	    from '../match/slice/MatchSlice';
import { wrapperMatch }         from '../match/store/MatchStore';
import { MatchesInterface }     from '../match/models/MatchInterface';

import 	mongoose, { Document, Schema } from 'mongoose';
 
export const getServerSideProps = wrapperMatch.getServerSideProps(
    (store) => async (context) => {      
        
		async function connectToDb() {
			try {
				await mongoose.connect('mongodb://79.55.63.147:27017/testdb', {            
					
				});
				console.log('Connected to MongoDB');
				const FeedSchema = new Schema({
					name: { type: String, required: true, maxlength: 255 },
					endPoint: { type: String, required: true, maxlength: 255 },
					format: { type: String, required: true, enum: ['VALUE1', 'VALUE2', 'VALUE3'] } // example enum values for "valore da costanti di classe"
				});
				const Feed = mongoose.model('Feed', FeedSchema);


				  animalSchema.index({ name: 1, type: -1 }); // schema level
			} catch (error) {
				console.error('Error connecting to MongoDB:', error);
			}
		}
		connectToDb();
      return {
        props: {},
      };
    }
);


function MatchesBoardPage(data:any) {    
    const dispatch = useDispatch();


    return(  
        <>                                                        
            <Header/>            
                <Main MatchBoard={<MatchesBoard/>}/>
            <Footer/>            
        </>
    );
}

export default MatchesBoardPage;